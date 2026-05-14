#!/usr/bin/env bash
# =============================================================================
# Anderson Rafhael — Deploy na VPS
#
# Uso: VPS_HOST=root@72.60.54.190 APP_DOMAIN=andersonrafhael.requiemcompany.com.br bash infra/deploy.sh
#
# Arquitetura: Docker standalone (Next.js SSR) → Traefik (sigma-network)
#
# Pré-requisitos na VPS:
# - Docker + Compose v2 instalados
# - Traefik rodando na infra_sigma-network com certresolver letsencrypt
# - Repo clonado em /opt/andersonrafhael:
#     git clone https://github.com/andersonrafhael/andersonrafhael.git /opt/andersonrafhael
#
# O que faz:
#   1. Verifica DNS
#   2. SSH na VPS, entra em /opt/andersonrafhael
#   3. git pull (pega o código mais recente)
#   4. docker compose up --build -d (rebuilda e sobe)
#   5. Verifica HTTP 200
# =============================================================================
set -euo pipefail

REMOTE_DIR="/opt/andersonrafhael"
VPS_HOST="${VPS_HOST:-}"
APP_DOMAIN="${APP_DOMAIN:-andersonrafhael.requiemcompany.com.br}"

if [[ -z "$VPS_HOST" ]]; then
  echo "Erro: defina VPS_HOST=user@ip"
  echo "Exemplo: VPS_HOST=root@72.60.54.190 APP_DOMAIN=andersonrafhael.requiemcompany.com.br bash infra/deploy.sh"
  exit 1
fi

echo "=== Anderson Rafhael — Deploy ==="
echo "Destino : $VPS_HOST"
echo "Domínio : https://$APP_DOMAIN"
echo ""

# ─── 1. DNS check ─────────────────────────────────────────────────────────────
echo "[1/3] Verificando DNS..."
RESOLVED_IP=$(dig +short "$APP_DOMAIN" 2>/dev/null | tail -1 || echo "")
if [[ -z "$RESOLVED_IP" ]]; then
  echo "⚠  $APP_DOMAIN ainda não resolve — DNS pode estar propagando."
  read -r -p "   Continuar mesmo assim? (s/N) " confirm
  [[ "$confirm" =~ ^[Ss]$ ]] || exit 0
else
  echo "✓ DNS OK: $APP_DOMAIN → $RESOLVED_IP"
fi

# ─── 2. Pull e rebuild na VPS ─────────────────────────────────────────────────
echo "[2/3] Atualizando e rebuildando na VPS..."
ssh "$VPS_HOST" "
  set -euo pipefail
  cd $REMOTE_DIR
  git pull
  APP_DOMAIN=$APP_DOMAIN docker compose -f infra/docker-compose.yml up --build -d
  echo '✓ Container subiu'
"

# ─── 3. Verificação ───────────────────────────────────────────────────────────
echo "[3/3] Verificando resposta HTTP..."
sleep 5
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "https://$APP_DOMAIN" || echo "000")
if [[ "$HTTP_CODE" == "200" ]]; then
  echo "✓ Site no ar: https://$APP_DOMAIN (HTTP $HTTP_CODE)"
else
  echo "⚠  Resposta inesperada: HTTP $HTTP_CODE"
  echo "   Verifique: ssh $VPS_HOST 'docker logs andersonrafhael'"
  exit 1
fi

echo ""
echo "=== Deploy concluído ==="
echo "https://$APP_DOMAIN"
