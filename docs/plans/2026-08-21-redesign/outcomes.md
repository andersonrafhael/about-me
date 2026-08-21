---
task: "redesign-2026-08"
plan-ref: "docs/plans/2026-08-21-redesign/plan.md"
date: "2026-08-21"
size: "L"
---

# Outcomes — redesign-2026-08

Critérios de saída declarativos e machine-checkable.

## Critérios de Saída

| # | Critério | Comando de Verificação | Esperado |
|---|---------|----------------------|---------|
| 1 | Gate mecânico verde (tsc + eslint + build) | `npm run quality` | `exit 0` |
| 2 | Barra do gauntlet (Lighthouse, axe, HTML/SEO, teclado, links) | `node scripts/gauntlet/check.mjs` | `exit 0` |
| 3 | Contrato de loop válido | `python3 ~/Desktop/Antigravity/requiem-forge/scripts/loop-contract-validate.py docs/plans/2026-08-21-redesign/loop-contract.json --repo-root .` | `exit 0` |
| 4 | E2E Playwright verde | `npx playwright test` | `exit 0` |
| 5 | Nenhum IP literal de VPS no repositório | `! git grep -nE '([0-9]{1,3}\.){3}[0-9]{1,3}' -- infra .github` | `exit 0` |
| 6 | Libs removidas (WebGL glass, framer-motion) | `! grep -E '"(@ybouane/liquidglass|framer-motion|patch-package)"' package.json` | `exit 0` |
| 7 | Tela Brasil ausente do site (trava jurídica) | `! grep -ril 'tela brasil' src/data src/app src/components` | `exit 0` |
| 8 | Nenhum domínio morto linkado | `! grep -rE 'https://(www\.)?requiemcompany\.com\.br|rhema\.requiemcompany' src` | `exit 0` |
| 9 | Slug `sgtu` redireciona para `unipass` | `grep -q 'unipass' next.config.ts && grep -q 'sgtu' next.config.ts` | `exit 0` |
| 10 | Push feito (main local == origin/main) | `test "$(git rev-parse HEAD)" = "$(git ls-remote origin refs/heads/main \| cut -f1)"` | `exit 0` |

## Verify All

```bash
npm run quality && \
node scripts/gauntlet/check.mjs --no-build && \
python3 ~/Desktop/Antigravity/requiem-forge/scripts/loop-contract-validate.py docs/plans/2026-08-21-redesign/loop-contract.json --repo-root . && \
npx playwright test && \
! git grep -nE '([0-9]{1,3}\.){3}[0-9]{1,3}' -- infra .github && \
! grep -E '"(@ybouane/liquidglass|framer-motion|patch-package)"' package.json && \
! grep -ril 'tela brasil' src/data src/app src/components && \
! grep -rE 'https://(www\.)?requiemcompany\.com\.br|rhema\.requiemcompany' src && \
grep -q 'unipass' next.config.ts && grep -q 'sgtu' next.config.ts && \
test "$(git rev-parse HEAD)" = "$(git ls-remote origin refs/heads/main | cut -f1)" && \
echo "ALL OUTCOMES PASS"
```

## Status

- [ ] Todos os critérios passando individualmente
- [ ] `verify-all` executado — retornou `exit 0` e imprimiu `ALL OUTCOMES PASS`
- [ ] Evidência registrada em `verify.md` (obrigatório em L)
