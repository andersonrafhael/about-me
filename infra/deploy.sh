#!/usr/bin/env bash
# =============================================================================
# Anderson Rafhael — Deploy na VPS
#
# Uso:      VPS_HOST=user@host APP_DOMAIN=andersonrafhael.requiemcompany.com.br bash infra/deploy.sh
# Rollback: VPS_HOST=user@host bash infra/deploy.sh --rollback
# Diagnóstico DNS-ausente vs app-fora: VPS_HOST=user@host VPS_IP=<ip-da-vps> bash infra/deploy.sh
#
# Arquitetura: Docker standalone (Next.js SSR) → Traefik (infra_sigma-network)
# Pré-requisitos na VPS: Docker + Compose v2, Traefik na infra_sigma-network
# (certresolver letsencrypt), repo clonado em $REMOTE_DIR.
#
# Variáveis (todas opcionais exceto VPS_HOST):
#   VPS_HOST    usuário@host da VPS (obrigatório)
#   VPS_IP      IP da VPS — checagem via --resolve quando o DNS falha
#   APP_DOMAIN  default: andersonrafhael.requiemcompany.com.br
#   REMOTE_DIR  default: /opt/andersonrafhael
#   GIT_REF     default: main
# =============================================================================
set -euo pipefail

VPS_HOST="${VPS_HOST:-}"
VPS_IP="${VPS_IP:-}"
APP_DOMAIN="${APP_DOMAIN:-andersonrafhael.requiemcompany.com.br}"
REMOTE_DIR="${REMOTE_DIR:-/opt/andersonrafhael}"
GIT_REF="${GIT_REF:-main}"
ROLLBACK=false

for arg in "$@"; do
  case "$arg" in
    --rollback) ROLLBACK=true ;;
    *)
      echo "Argumento desconhecido: $arg" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$VPS_HOST" ]]; then
  echo "Erro: defina VPS_HOST=usuario@host" >&2
  exit 1
fi

echo "=== Anderson Rafhael — Deploy ==="
echo "Destino : $VPS_HOST"
echo "Domínio : https://$APP_DOMAIN"
echo "Ref     : $GIT_REF"
echo "Modo    : $([[ "$ROLLBACK" == true ]] && echo ROLLBACK || echo DEPLOY)"
echo ""

# ─── 1. DNS check ────────────────────────────────────────────────────────────
echo "[1/4] Verificando DNS..."
DNS_OK=true
RESOLVED_IP="$(dig +short "$APP_DOMAIN" 2>/dev/null | tail -1 || true)"
if [[ -z "$RESOLVED_IP" ]]; then
  DNS_OK=false
  echo "AVISO: $APP_DOMAIN não resolve. O deploy segue, mas o site não fica"
  echo "       acessível publicamente até o registro DNS existir (ver docs/runbook.md)."
  if [[ -n "$VPS_IP" ]]; then
    echo "       Checando se o app responde direto no IP, para separar 'DNS ausente' de 'app fora'..."
    RESOLVE_CODE="$(curl -sk -o /dev/null -w '%{http_code}' --max-time 10 \
      --resolve "${APP_DOMAIN}:80:${VPS_IP}" --resolve "${APP_DOMAIN}:443:${VPS_IP}" \
      "http://${APP_DOMAIN}/" 2>/dev/null || echo "000")"
    if [[ "$RESOLVE_CODE" =~ ^(200|301|308)$ ]]; then
      echo "       ✓ App responde no IP (HTTP $RESOLVE_CODE) — confirmado: é só DNS, app saudável."
    else
      echo "       ✗ App também não respondeu no IP (HTTP $RESOLVE_CODE) — investigar Traefik/container."
    fi
  else
    echo "       Dica: rode com VPS_IP=<ip-da-vps> para checar o app direto, sem depender do DNS."
  fi
  if [[ -t 0 ]]; then
    read -r -p "       Continuar mesmo assim? (s/N) " confirm
    [[ "$confirm" =~ ^[Ss]$ ]] || exit 0
  else
    echo "       Execução não-interativa: prosseguindo apesar do aviso."
  fi
else
  echo "✓ DNS OK: $APP_DOMAIN → $RESOLVED_IP"
fi

# ─── 2. Pré-voo remoto (rede Traefik) ──────────────────────────────────────────
echo "[2/4] Checando pré-condições na VPS..."
ssh "$VPS_HOST" bash -s <<'PREFLIGHT'
set -euo pipefail
if ! docker network inspect infra_sigma-network >/dev/null 2>&1; then
  echo "ERRO: rede docker 'infra_sigma-network' não existe na VPS." >&2
  echo "      Suba o Traefik da infra do host antes de tentar o deploy." >&2
  exit 1
fi
TRAEFIK_STATE="$(docker inspect -f '{{.State.Status}}' traefik 2>/dev/null || echo ausente)"
if [[ "$TRAEFIK_STATE" != "running" ]]; then
  echo "ERRO: container 'traefik' não está 'running' (estado: $TRAEFIK_STATE)." >&2
  echo "      Verifique se o nginx do host tomou a porta :80 no boot (ver docs/runbook.md, incidente 2026-06-08)." >&2
  exit 1
fi
echo "✓ Rede infra_sigma-network OK, Traefik running."
PREFLIGHT

# ─── 3. Deploy ou rollback ─────────────────────────────────────────────────────
if [[ "$ROLLBACK" == true ]]; then
  echo "[3/4] Executando rollback para o commit anterior..."
  DEPLOY_OUTPUT="$(ssh "$VPS_HOST" REMOTE_DIR="$REMOTE_DIR" APP_DOMAIN="$APP_DOMAIN" bash -s <<'ROLLBACK'
set -euo pipefail
cd "$REMOTE_DIR"
if [[ ! -f .last-deploy ]]; then
  echo "ERRO: .last-deploy não encontrado — nenhum commit anterior registrado." >&2
  exit 1
fi
PREV_COMMIT="$(cat .last-deploy)"
git fetch --all
git checkout --detach "$PREV_COMMIT"
APP_DOMAIN="$APP_DOMAIN" docker compose -f infra/docker-compose.yml up --build -d
echo "COMMIT_IMPLANTADO=$PREV_COMMIT"
ROLLBACK
)"
else
  echo "[3/4] git fetch + reset --hard origin/$GIT_REF e rebuild do container..."
  DEPLOY_OUTPUT="$(ssh "$VPS_HOST" REMOTE_DIR="$REMOTE_DIR" GIT_REF="$GIT_REF" APP_DOMAIN="$APP_DOMAIN" bash -s <<'DEPLOY'
set -euo pipefail
cd "$REMOTE_DIR"
PREV_COMMIT="$(git rev-parse HEAD)"
echo "Commit anteriormente em produção (log de rollback): $PREV_COMMIT"
git fetch --all
git reset --hard "origin/${GIT_REF}"
NEW_COMMIT="$(git rev-parse HEAD)"
echo "$PREV_COMMIT" > .last-deploy
APP_DOMAIN="$APP_DOMAIN" docker compose -f infra/docker-compose.yml up --build -d
echo "COMMIT_IMPLANTADO=$NEW_COMMIT"
DEPLOY
)"
fi
echo "$DEPLOY_OUTPUT"
DEPLOYED_COMMIT="$(echo "$DEPLOY_OUTPUT" | grep '^COMMIT_IMPLANTADO=' | cut -d= -f2 || true)"

# ─── 4. Healthcheck ────────────────────────────────────────────────────────────
echo "[4/4] Healthcheck (6 tentativas, 5s entre elas)..."
HTTP_CODE="000"
for i in 1 2 3 4 5 6; do
  HTTP_CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "https://$APP_DOMAIN/" || echo "000")"
  [[ "$HTTP_CODE" == "200" ]] && break
  echo "  tentativa $i/6: HTTP $HTTP_CODE — aguardando 5s..."
  sleep 5
done

# Regra única: deploy bem-sucedido = o origin responde 200 ao domínio; DNS é um aviso
# separado. Nunca sair 0 sem que o origin tenha efetivamente respondido 200.
if [[ "$HTTP_CODE" == "200" ]]; then
  echo "✓ Site respondendo: https://$APP_DOMAIN (HTTP 200)"
elif [[ "$DNS_OK" == false ]]; then
  ORIGIN_IP="${VPS_IP:-${VPS_HOST#*@}}"
  echo "AVISO: site não respondeu 200 publicamente, e o DNS já estava ausente no passo 1."
  echo "       Sondando o origin direto via --resolve (IP: $ORIGIN_IP), para confirmar se o"
  echo "       app está saudável e falta só o registro DNS..."
  ORIGIN_CODE="$(curl -sk -o /dev/null -w '%{http_code}' --max-time 10 \
    --resolve "${APP_DOMAIN}:443:${ORIGIN_IP}" "https://${APP_DOMAIN}/" 2>/dev/null || echo "000")"
  if [[ "$ORIGIN_CODE" == "200" ]]; then
    echo "AVISO: app no ar no origin (HTTP $ORIGIN_CODE) — falta o DNS (ver docs/runbook.md)."
  else
    echo "ERRO: site não respondeu 200 nem publicamente nem no origin (HTTP $ORIGIN_CODE)." >&2
    echo "      DNS ausente E app não responde — investigue: ssh $VPS_HOST 'docker logs andersonrafhael'" >&2
    exit 1
  fi
else
  echo "ERRO: site não respondeu 200 após 6 tentativas (último: HTTP $HTTP_CODE)." >&2
  echo "      DNS estava OK — investigue: ssh $VPS_HOST 'docker logs andersonrafhael'" >&2
  exit 1
fi

echo ""
echo "=== Concluído ==="
echo "Commit implantado: ${DEPLOYED_COMMIT:-desconhecido}"
echo "https://$APP_DOMAIN"
