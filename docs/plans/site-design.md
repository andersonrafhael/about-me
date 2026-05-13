# Design Doc — anderson.requiemcompany.com.br

**Data:** 2026-05-13
**Status:** Aprovado para implementação
**Autor:** Anderson Rafhael

---

## Problema

Anderson Rafhael não tem presença digital consolidada como founder. Existe portfolio disperso em repositórios, projetos no ar sem narrativa unificada, e nenhum ponto de entrada único para investidores, parceiros institucionais ou comunidade tech.

**Contexto de prazo:** benchmark mínimo para candidatura Forbes Under 30 Brasil 2027 inclui ≥5 menções em mídia. O site precisa estar no ar com conteúdo real até **Q3/2026** — jornalistas verificam o site antes de qualquer conversa.

---

## Audiência e Ação Desejada

| Audiência | Prioridade | Ação desejada |
|---|---|---|
| Investidores / ecossistema de inovação | 1 | Entender portfólio e projetos → perceber autoridade técnica |
| Comunidade tech | 2 | Reconhecer profundidade técnica → seguir escrita |
| Gestores públicos / municípios | 3 | Ver casos de uso verificáveis → iniciar conversa |
| Mídia / jornalistas | 4 | Encontrar narrativa pronta → menção espontânea |

---

## Constraints

- Stack: Next.js 16+ App Router + TypeScript strict + Tailwind v4 + shadcn/ui new-york
- Blog via MDX nativo — sem CMS externo
- Deploy: Vercel
- URL: `andersonrafhael.requiemcompany.com.br`
- Identidade: Anderson em primeiro plano, Requiem Company em destaque (não apêndice)
- **Não lançar com seção `/escrita` vazia** — mínimo 3 essays antes do go-live

---

## Arquitetura de Informação

```
andersonrafhael.requiemcompany.com.br/
│
├── /                  → Hero + tagline + métricas âncora + CTAs
├── /projetos          → Portfólio completo (cards + páginas individuais)
│     │
│     │  [Tier 1 — Requiem Company / Anderson como Builder]
│     ├── sigma          (sinalização viária — produto principal)
│     ├── sgtu           (transporte escolar municipal)
│     ├── sgdi           (saúde — dispositivos cardíacos)
│     ├── ciris          (inteligência urbana)
│     ├── synapse-lab    (PKM com IA — Sonda, Pulso, workspace)
│     ├── rhema          (pesquisa aplicada)
│     ├── microred       (mobilidade elétrica, OCPP)
│     ├── chatdigi
│     └── nexus
│     │
│     │  [Tier 2 — NEES/UFAL / Anderson como Gerente de Produto]
│     ├── spte-iafree    (permanência escolar — MEC)
│     ├── cultbr         (gestão cultural — MinC)
│     └── tela-brasil    (audiovisual público — MinC)
├── /escrita           → Essays e artigos (MDX, git-native)
├── /pesquisa          → Papers publicados, contribuições open source, RHEMA
├── /sobre             → Narrativa completa + Requiem Company
└── /contato           → Email + LinkedIn + GitHub
```

**Navegação (nav principal):**
```
[AR] [Requiem Company ↗]          Projetos / Escrita / Pesquisa / Sobre / Contato
```

**Decisões de IA:**
- `/escrita` antes de `/pesquisa` no nav — escrita é prova de pensamento, pesquisa é credencial
- `/sobre` penúltimo — investidor lê sobre depois de ver evidência
- Cada projeto tem URL própria com profundidade real — sem modal, sem accordion

---

## Stack Técnica

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 16+ App Router | SSG para blog/portfólio + SSR onde necessário |
| Linguagem | TypeScript strict | Padrão Antigravity |
| CSS | Tailwind v4 CSS-first + `@theme` | Padrão Antigravity |
| Componentes | shadcn/ui new-york | Padrão Antigravity |
| Blog | MDX nativo | Posts no Git — rascunho = branch, publicação = merge |
| Deploy | Vercel | Zero config, preview por PR |
| Analytics | Vercel Analytics | GDPR-safe, sem cookie banner |
| Repo | GitHub pessoal (`andersonrafhael`) | Separado dos repos Requiem, público |

**Fora do escopo inicial:** CMS, auth, newsletter, internacionalização.

---

## Design System

### Paleta — Herança Antigravity (RHEMA + Synapse)

```css
/* Backgrounds — void scale */
--void-deep:    #0e0e13;   /* fundo máximo, abaixo do fold */
--void:         #131318;   /* background principal */
--surface-low:  #1b1b20;   /* cards secundários */
--surface:      #1f1f25;   /* cards principais */
--surface-high: #2a292f;   /* hover states */

/* Primário — Violet */
--primary:      #8b5cf6;
--primary-glow: rgba(137, 111, 255, 0.3);

/* Acento — Mint (live/ativo) */
--mint:         #8fd6a8;
--mint-dark:    #6ea883;

/* Texto */
--foreground:   #e4e1e9;   /* texto principal */
--muted:        #938ea0;   /* texto secundário */
--border:       #252533;

/* Glass */
--glass-bg:     rgba(31, 31, 37, 0.618);
--glass-border: rgba(202, 190, 255, 0.15);
```

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display / wordmark | Dune Rise | Hero principal, logo AR, títulos de capa |
| Headline | Space Grotesk | Títulos de seção, subtítulos |
| Body | Inter | Corpo de texto, UI geral |
| Mono | JetBrains Mono | Métricas, dados técnicos, snippets |

### Motion

- Entradas: `fade-up` 400ms, `ease-out` — sem bounce
- Gradientes: estáticos ou transição lenta (≥3s) — não piscam
- Sem partículas, sem Three.js no hero
- `prefers-reduced-motion` respeitado em toda animação

### Glass (cards de projeto, nav)

```css
background: rgba(31, 31, 37, 0.618);
border: 1px solid rgba(202, 190, 255, 0.15);
box-shadow: 0 10px 30px rgba(137, 111, 255, 0.3);
```

---

## Estratégia de Conteúdo

### Hero (/)

- Foto profissional (não selfie, não corporativa genérica)
- Tagline: **"Construo infraestrutura digital de ponta para gestão pública, saúde e mobilidade."** (em português, verificável, sem jargão)
- Logo Requiem Company em destaque (link para requiemcompany.com.br)
- Métricas âncora contextualizadas: `[X municípios no Nordeste] · [N projetos ativos] · [Fundada 2022]`
- CTAs: `Projetos ↓` / `Escrita ↓`

**Anti-pattern evitado:** "apaixonado por tecnologia", "full-stack developer", "inovando o mundo".

### /projetos

Card por projeto:
- Nome + categoria (GovTech / EdTech / IA / Infra / Pesquisa)
- Status badge (Ativo / Beta / Encerrado) com mint-pulse se Ativo
- Uma frase de problema
- Hover: stack resumida + métrica principal

Página individual (template):
```
Problema completo → Por que existia essa lacuna?
Abordagem        → Decisão técnica e por que (não o código, o raciocínio)
Escala           → [Número] contexto de ineditismo geográfico → impacto em pessoa real
Aprendizado      → O que mudou na forma de pensar
```

**Projetos Tier 1 (Anderson-built):** Sigma (sinalização viária — ciclo completo: Planejamento → Projeto → Aprovação → Ordem Administrativa → Execução em Campo → Estoque → Inventário → Relatórios → Inteligência), SGTU, SGDI (saúde / dispositivos cardíacos), CIRIS, Synapse Lab (Sonda/Pulso/workspace), RHEMA, MicroRed, ChatDigi, Nexus.

**Projetos Tier 2 (Anderson como PM — NEES/UFAL):** SPTE/IAFREE (MEC), CultBR (MinC), Tela Brasil (MinC). Cards com papel explícito: "Gerente de Produto — NEES/UFAL". Página individual diferencia o papel sem omitir contribuição.

### /escrita

- MDX. Quatro categorias: `Engenharia` / `GovTech` / `Produto` / `IA`
- Cadência: 1-2/mês agora, crescendo para newsletter + LinkedIn ativo (meta)
- Critério de publicação: resolve uma dúvida real ou explica uma decisão não-óbvia
- **Mínimo 3 essays antes do go-live**

Essays de alto impacto sugeridos para lançamento:
1. *"Por que municípios brasileiros precisam de tecnologia que nenhuma startup quer construir"*
2. *"SGTU: por que o transporte escolar é o problema de gestão mais complexo do município médio"*
3. *"Infraestrutura digital fora do eixo: lições de construir em Alagoas sem capital externo"*

### /pesquisa

- Papers publicados: título, DOI, abstract curto, venue, ano
- Contribuições open source: link para PR/repo + contexto
- RHEMA como projeto de pesquisa aplicada: descrição própria, link para a ferramenta

### /sobre

Estrutura de bio validada:
1. **Identidade**: função + empresa + localização relevante
2. **Missão**: o problema que move, não a tecnologia usada
3. **Requiem Company**: contexto, portfólio, missão
4. **Humano**: 1-2 elementos pessoais sem folclore

Esboço validado:
> "Engenheiro de software e fundador da Requiem Company. Construo infraestrutura digital para municípios brasileiros — sistemas que gestores públicos usam para tomar decisões sobre sinalização viária, transporte escolar e gestão urbana. Fora do eixo SP-RJ, acredito que tecnologia de qualidade não é privilégio de capital."

### /contato

- LinkedIn (primário), email profissional, GitHub
- Frase sobre tipo de conversa bem-vinda
- Sem formulário — link direto

---

## Fluxo de Prototipagem (Claude Design)

**Fase de exploração** — antes de qualquer código:

```
1. Upload do globals.css com paleta void/violet/mint
2. Prompt inicial vago: "Crie o hero do site pessoal de Anderson Rafhael,
   fundador da Requiem Company. Dark, editorial, premium.
   Referências: unmoth.com, midu.design"
3. Responder perguntas do canvas + usar scratchpad para layout
4. Pedir 4 variações para comparar direções
5. Usar Tweaks panel para refinar, não re-prompt
6. Anotar diretamente no canvas → Send to Claude
7. Screenshot dos estados que funcionaram (sem histórico navegável)
8. Exportar handoff bundle
```

**Sequência de seções a prototipar:**
1. Hero completo
2. Card de projeto (glass + hover state)
3. Listing de /escrita
4. Nav fixo
5. Página individual de projeto

**Transição para código:**
- Bundle do Claude Design → referência visual para Claude Code
- Claude Code implementa com forge-conventions, tokens reais, componentes reais
- Não copiar código do bundle — reimplementar com stack Antigravity

---

## Success Criteria

### Go-live (Q3/2026)

- [ ] Site no ar em `andersonrafhael.requiemcompany.com.br`
- [ ] Todas as 6 seções com conteúdo real (nenhuma "em breve")
- [ ] Mínimo 3 essays publicados em `/escrita`
- [ ] Mínimo 6 projetos com página individual completa
- [ ] `/pesquisa` com ≥1 paper e RHEMA documentado
- [ ] Foto profissional aprovada
- [ ] Métricas âncora atualizadas e verificáveis
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95
- [ ] WCAG 2.2 AA (4.5:1 mínimo, todos os elementos)
- [ ] Dark mode nativo
- [ ] Mobile-first verificado em dispositivo real

### Pós-lançamento (Q4/2026–Q1/2027)

- [ ] Cadência de 1-2 essays/mês mantida
- [ ] LinkedIn distribuindo conteúdo do site
- [ ] ≥1 menção de mídia referenciando o site
- [ ] Newsletter configurada (entrada para fase D)

---

## Referências Visuais

| Referência | URL | O que herdar |
|---|---|---|
| unmoth.com | https://unmoth.com | Ousadia editorial, dark, minimal nav, grid de projetos visual |
| midu.design | https://midu.design | Gradientes calibrados, sensação premium, scarcity UX |
| basedash.com | https://www.basedash.com | Hero com impacto, CTAs diretos, trust signals |
| RHEMA | https://rhema.requiemcompany.com.br | Paleta void/violet/mint, Dune Rise, precisão técnica como estética |
| Synapse Lab | — | Glass morphism, purple glow, void scale |
