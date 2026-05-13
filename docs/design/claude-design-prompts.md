# Claude Design — Prompts e Status

**Sessão:** 2026-05-13
**Ferramenta:** claude.ai/design
**Status geral:** exploração concluída — handoff bundle pendente

---

## Prompt 2 — Hero Section

```
Reestruture a hierarquia do headline em dois níveis:

Display (fonte máxima, bold, 2-3 palavras):
"Infraestrutura digital."

Subtitle imediatamente abaixo (fonte grande mas menor ~40% do display,
weight regular ou medium, 1 linha):
"de ponta para gestão pública, saúde e mobilidade."

O display ancora o visual. O subtitle completa a frase.
Manter underlines violet nas palavras-chave no subtitle.
Manter tudo alinhado à esquerda.
Manter a sidebar de metadata, o live clock e as coordenadas.
```

**Status:** ✅ Aprovado — Option B (display split). Screenshot capturado.
**O que funcionou:** live clock "NO AR · HH:MM:SS BRT", coordenadas no sidebar, underlines violet, alinhamento esquerdo.

---

## Prompt 3 — Card de Projeto

```
Crie um card de projeto com glass morphism.

Estrutura:
- Topo: tag de categoria colorida por tipo + status badge
  (dot mint pulsando se Ativo, dot muted se Encerrado)
- Meio: nome do projeto em headline + frase curta de problema (1 linha)
- Rodapé (visível apenas no hover): tags de stack em font-mono pequeno

Mapeamento de cores por categoria:
GovTech      → violet  (#8b5cf6)
EdTech       → mint    (#8fd6a8)
IA aplicada  → roxo    (#a78bfa)
HealthTech   → rose    (#f472b6)
CleanTech    → emerald (#34d399)
Pesquisa     → amber   (#fbbf24)

Efeito glass:
background:  rgba(31, 31, 37, 0.618)
border:      1px solid rgba(202, 190, 255, 0.15)
box-shadow:  0 10px 30px rgba(137, 111, 255, 0.15)
border-radius: 12px

Hover state:
- translateY -4px (leve lift)
- border muda para rgba(139, 92, 246, 0.30)
- rodapé com stack aparece com fade-in

Fundo da página: #131318 (void)
Mostrar 3 cards lado a lado com categorias diferentes
para validar o sistema de cores.
```

**Status:** ✅ Aprovado. Screenshots capturados (normal + hover).

---

## Prompt 4 — Listing /projetos (Lista + Hover Panel)

```
Atualize a lista de projetos inserindo o nome completo
logo abaixo de cada sigla, em texto menor e muted.

Hierarquia visual de cada item:
- Número (mono, muted)
- Nome / sigla (headline grande)
- Nome completo ou descrição (body pequeno, muted, logo abaixo)
- Categoria · subcategoria (mono pequeno, colorido)
- Ano (mono, muted, direita)

Dados exatos:

01 · Sigma
     Smart Signaling Management System
     GOVTECH · SINALIZAÇÃO VIÁRIA — 2022

02 · SGTU
     Sistema de Gestão de Transporte Universitário
     GOVTECH · EDUCAÇÃO — 2023

03 · SGDI
     Sistema de Gestão de Dispositivos Implantáveis
     HEALTHTECH — 2024

04 · Synapse Lab
     Workspace inteligente de gestão de conhecimento com IA
     IA APLICADA · PKM — 2025

05 · RHEMA
     Requiem Hierarchy Excellence Maturity Artifact
     PESQUISA APLICADA — 2025

06 · MicroRed
     Plataforma de gestão de eletropostos e mobilidade elétrica
     CLEANTECH — 2025

Corrigir também: Sigma era "MOBILIDADE URBANA" — trocar para "SINALIZAÇÃO VIÁRIA".
Manter o painel de hover lateral com descrição + stack.
```

**Status:** ✅ Enviado. Layout aprovado: lista + painel hover lateral.

---

## Prompt 5 — Listing /escrita

```
Crie a seção de listagem de artigos do blog.

Layout: lista vertical com separadores sutis entre itens.
Sem grid de cards. Sem thumbnails.
Tipografia como elemento visual principal.

Cada item:
- Linha de meta (font-mono pequeno, muted):
  categoria colorida · tempo de leitura · data
  Cores de categoria: Engenharia=violet, GovTech=mint,
  Produto=amber, IA=roxo
- Título do artigo (headline médio, bold)
  Hover: título muda para violet com transição suave
- Excerpt em uma linha (body, muted, truncado)

Mostrar 4 artigos de exemplo com categorias variadas.
Fundo: #131318. Separadores: rgba(202, 190, 255, 0.08)
```

**Status:** ✅ Enviado. Screenshot pendente.

---

## Prompt 6 — Nav Fixo

```
Crie um nav fixo com glass morphism que completa o hero gerado.

Estrutura em três zonas:

ESQUERDA:
- "AR" em Dune Rise (font-display, bold) — logotipo do Anderson
- "Requiem Company ↗" logo ao lado, texto muted pequeno, link externo

CENTRO:
- Live status: dot mint pulsando + "NO AR · HH:MM:SS BRT"
- Atualiza em tempo real (mostrar como elemento estático no protótipo)

DIREITA:
- Links de navegação em mono pequeno, muted:
  Projetos / Escrita / Pesquisa / Sobre / Contato
- Hover: foreground com transição suave
- Link ativo: violet

Glass:
- background: rgba(31, 31, 37, 0.618)
- border-bottom: 1px solid rgba(202, 190, 255, 0.15)
- backdrop-filter: blur(12px)
- position: fixed, top: 0, largura total

Sem hamburger em desktop.
Altura do nav: 56px.
Mostrar em contexto — nav sobre o hero já gerado.
```

**Status:** ✅ Enviado. Screenshot pendente.

---

## Prompt 7 — Página Individual de Projeto

```
Crie o template da página individual de projeto.
Usar Sigma como exemplo de conteúdo.

HEADER DA PÁGINA:
- Breadcrumb: Projetos / Sigma (mono, muted)
- Nome grande: "Sigma" em display
- Nome completo abaixo: "Smart Signaling Management System" (muted)
- Linha de meta: tag GOVTECH (violet) · tag SINALIZAÇÃO VIÁRIA ·
  status EM PRODUÇÃO (mint) · 2022
- Separador horizontal sutil

LAYOUT PRINCIPAL — duas colunas:
Coluna esquerda (70%): conteúdo narrativo
Coluna direita (30%): metadata técnica fixada

COLUNA ESQUERDA — quatro seções em sequência:

§ Problema
"Prefeituras brasileiras gerenciam sinalização viária em planilhas.
Sem rastreabilidade de campo, sem inventário auditável, sem integração
entre planejamento e execução."

§ Abordagem
"Ciclo operacional fechado em uma plataforma: planejamento → projeto
→ aprovação → ordem administrativa → execução em campo → estoque
→ inventário → relatórios → inteligência."

§ Escala
"Multi-tenant. Um sistema, múltiplas prefeituras.
Cada município opera com dados isolados e identidade própria."

§ Aprendizado
"Gestão pública exige rastreabilidade antes de inteligência.
Construir o ciclo completo é mais difícil e mais valioso do que
construir o dashboard."

COLUNA DIREITA — metadata técnica:
PAPEL        Founder / Eng
STATUS       Em produção
STACK        Next.js · Django · PostGIS · Multi-tenant
PARCEIRO     Prefeituras municipais
ANO          2022
[botão outline: Ver projeto ao vivo ↗]

Fundo: #131318. Tipografia como elemento visual principal.
Sem hero de imagem centralizado — editorial, não landing page.
```

**Status:** ✅ Enviado. Screenshot pendente.

---

## Prompt 8 — Página /sobre

```
Crie a página /sobre. Tom: manifesto de founder, não CV.
Editorial, narrativa, sem bullet points de habilidades.

ESTRUTURA EM QUATRO BLOCOS:

§ 01 — Identidade
"Engenheiro de software e fundador da Requiem Company.
Construo infraestrutura digital de ponta para gestão pública,
saúde e mobilidade — sistemas que gestores usam para tomar
decisões reais. Alagoas, fora do eixo SP-RJ."

§ 02 — Missão
"A maior parte da tecnologia disponível foi construída para
quem já tem acesso. Municípios médios, hospitais públicos,
sistemas de mobilidade emergente — esses domínios não atraem
capital, não entram em pitch decks, mas são onde as decisões
mais impactantes acontecem. Construo onde o mercado não chegou."

§ 03 — Requiem Company
Nome + acrônimo REQUIEM em destaque visual:
R — Research / Requirements
E — Engineering
Q — Quality Assurance
U — User Experience
I — Integration / Innovation
E — Execution
M — Management

Linha abaixo: "Fundada em 2022. Sem investimento externo.
Alta densidade técnica, impacto operacional real."

§ 04 — Humano
"28 anos. Engenheiro da Computação. Pesquisador com papers
publicados. Construtor — não consultor."

Lema em destaque tipográfico ao final:
"Que meu cansaço a outros descanse."

ESTILO:
- Texto alinhado à esquerda, largura máxima 65ch
- Seções separadas por numeração § em mono violet
- Sem foto centralizada
- Fundo: #131318
```

**Status:** ✅ Enviado. Screenshot pendente.

---

## Pendências antes do handoff

- [ ] Screenshots dos prompts 5, 6, 7, 8
- [ ] Confirmar número real de municípios para substituir "10+" nas métricas do hero
- [ ] Exportar handoff bundle do Claude Design
- [ ] Revisar se /pesquisa e /contato precisam de prototipagem (recomendação: direto para código)
