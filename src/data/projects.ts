export type ProjectStatus = "ativo" | "beta" | "encerrado";
export type ProjectCategory = "GovTech" | "EdTech" | "IA" | "Infra" | "Pesquisa";
export type ProjectTier = 1 | 2;

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tagline: string;
  description: string;
  stack: string[];
  metrics?: string;
  url?: string;
  tier: ProjectTier;
  role?: string;
};

export const projects: Project[] = [
  // ── Tier 1 — Anderson como Builder ──────────────────────────────────────
  {
    slug: "sigma",
    name: "Sigma",
    category: "GovTech",
    status: "ativo",
    tier: 1,
    tagline: "Gestão urbana georreferenciada para municípios.",
    description:
      "Sistema de gestão territorial com georreferenciamento, operação em campo, RBAC/ABAC e suporte multi-tenant para prefeituras alagoanas. Ciclo completo: Planejamento → Projeto → Aprovação → Ordem Administrativa → Execução em Campo → Estoque → Inventário → Relatórios → Inteligência. Gestores municipais usam o Sigma para tomar decisões sobre sinalização viária, pavimentação e infraestrutura urbana — com visibilidade geoespacial e rastreabilidade de execução.",
    stack: ["Next.js", "Django", "PostGIS", "Supabase", "Cloudflare"],
    metrics: "Municípios alagoanos em operação · sinalização, pavimentação, infraestrutura",
  },
  {
    slug: "sgtu",
    name: "SGTU",
    category: "GovTech",
    status: "ativo",
    tier: 1,
    tagline: "Gestão de transporte escolar para municípios.",
    description:
      "Plataforma multi-tenant de gestão de frota, rotas e estudantes para secretarias municipais de educação. Ciclo operacional completo: cadastro de alunos, definição e otimização de rotas, controle de frota, conformidade legal e relatórios para o FNDE. Cada prefeitura opera em tenant isolado com dados segregados, RBAC por papel (secretário, motorista, gestor de frota) e auditoria integrada.",
    stack: ["Next.js", "Django", "Supabase", "PostgreSQL"],
    metrics: "Estudantes com transporte rastreável · frota + rotas em um único painel",
    url: "https://dev.sgtu.app.br",
  },
  {
    slug: "sgdi",
    name: "SGDI",
    category: "GovTech",
    status: "beta",
    tier: 1,
    tagline: "Rastreabilidade de dispositivos cardíacos implantáveis no SUS.",
    description:
      "Sistema de gestão e rastreabilidade de dispositivos cardíacos implantáveis (marcapassos, CDIs, ressincronizadores) para hospitais públicos do SUS. Cobre o ciclo completo: recebimento, estoque, implante, acompanhamento e auditoria — com conformidade regulatória ANVISA. Em POC com hospital público em Alagoas. Objeto de pesquisa acadêmica em andamento (SBCAS 2026).",
    stack: ["Django", "Next.js", "Supabase", "PostgreSQL"],
    metrics: "Hospital público · SUS · conformidade ANVISA",
  },
  {
    slug: "microred",
    name: "MicroRed",
    category: "Infra",
    status: "ativo",
    tier: 1,
    tagline: "Mobilidade elétrica e armazenamento de energia com OCPP 2.0.",
    description:
      "Plataforma completa para gestão de redes de mobilidade elétrica com integração do protocolo OCPP 2.0. Inclui plataforma de gestão de estações, aplicativo de recarga para usuário final e módulo de armazenamento de energia (ESS). Em plena operação com ambientes de produção ativos — gestão, aplicativo e infraestrutura de carregamento.",
    stack: ["Django", "OCPP 2.0", "IoT", "WebSocket", "PostgreSQL"],
    metrics: "Plataforma de gestão · aplicativo de recarga · ESS em produção",
    url: "https://mred.com.br",
  },
  {
    slug: "synapse-lab",
    name: "Synapse Lab",
    category: "IA",
    status: "beta",
    tier: 1,
    tagline: "PKM inteligente com IA — notas, projetos, RAG local.",
    description:
      "Workspace colaborativo de gestão de conhecimento pessoal com IA embarcada e RAG local. Features principais: Sonda (análise proativa do vault — identifica padrões, lacunas e conexões não óbvias) e Pulso (curadoria de contexto — surfacing ativo de notas relevantes para o momento). Alternativa ao Obsidian + Notion com IA nativa desde o dia zero.",
    stack: ["Next.js", "Supabase", "Claude API", "pgvector", "TypeScript"],
  },
  {
    slug: "ciris",
    name: "CIRIS",
    category: "IA",
    status: "beta",
    tier: 1,
    tagline: "Camada de inteligência para automação institucional.",
    description:
      "Plataforma de automação de processos e diagnóstico inteligente para organizações institucionais complexas. Integra LLMs, processamento de documentos não estruturados e workflows automatizados para reduzir gargalos operacionais em ambientes com alto volume de dados e múltiplos atores institucionais.",
    stack: ["Python", "Claude API", "Django", "Celery", "PostgreSQL"],
  },
  {
    slug: "rhema",
    name: "RHEMA",
    category: "Pesquisa",
    status: "ativo",
    tier: 1,
    tagline: "Engenharia formal de requisitos — Requiem Maturity Scale.",
    description:
      "Framework de engenharia de requisitos com hierarquia verificável, maturidade cumulativa e degradação temporal (Requiem Maturity Scale — RMS). Aplicado em sistemas multi-tenant de gestão pública. Objeto de pesquisa acadêmica com paper em submissão para o SBES 2026. A escala RHEMA permite classificar, verificar e evoluir requisitos ao longo do ciclo de vida do sistema com rastreabilidade formal.",
    stack: ["IEEE 29148", "Arc42", "C4 Model", "LaTeX", "RMS"],
    url: "https://rhema.requiemcompany.com.br",
    metrics: "Paper submetido ao SBES 2026",
  },
  // ── Tier 2 — Anderson como PM / NEES-UFAL ───────────────────────────────
  {
    slug: "spte-iafree",
    name: "SPTE / IAFREE",
    category: "EdTech",
    status: "ativo",
    tier: 2,
    role: "Gerente de Produto — NEES/UFAL",
    tagline: "Tecnologia como proteção de trajetórias escolares.",
    description:
      "Sistema de prevenção à evasão escolar — identificação precoce de risco e intervenção assistida por dados. Cruza frequência, desempenho e indicadores socioeconômicos para sinalizar alunos em risco antes do abandono. Projeto financiado pelo MEC. Anderson atua como Gerente de Produto no NEES/UFAL, responsável por requisitos, roadmap e articulação com secretarias municipais de educação parceiras.",
    stack: ["Django", "Supabase", "ML", "Python"],
    metrics: "Financiado pelo MEC · monitoramento de risco de evasão",
  },
  {
    slug: "cultbr",
    name: "CultBR",
    category: "GovTech",
    status: "ativo",
    tier: 2,
    role: "Gerente de Produto — NEES/UFAL",
    tagline: "Governança institucional para a política cultural brasileira.",
    description:
      "Plataforma de gestão administrativa e governança institucional para entidades culturais públicas no âmbito da Política Nacional de Aldir Blanc (PNAB). Gerencia fluxos de R$2,98 bilhões em políticas culturais federais. Anderson atua como Gerente de Produto no NEES/UFAL, conduzindo requisitos, gestão do ciclo de lançamento e articulação com o Ministério da Cultura.",
    stack: ["Next.js", "Django", "Supabase", "PostgreSQL"],
    metrics: "R$2,98bi em políticas culturais · Ministério da Cultura",
  },
  {
    slug: "tela-brasil",
    name: "Tela Brasil",
    category: "GovTech",
    status: "beta",
    tier: 2,
    role: "Gerente de Produto — NEES/UFAL",
    tagline: "Plataforma audiovisual pública — acesso, acessibilidade e cultura.",
    description:
      "Plataforma de distribuição de conteúdo audiovisual público com foco em acessibilidade (libras, audiodescrição, legendas) e políticas culturais. Parceria com o Ministério da Cultura no contexto da democratização do acesso ao audiovisual brasileiro. Anderson atua como Gerente de Produto, coordenando requisitos de acessibilidade e conformidade com WCAG 2.2 e políticas do MinC.",
    stack: ["Next.js", "Django", "Supabase"],
    metrics: "Ministério da Cultura · acessibilidade WCAG 2.2",
  },
];
