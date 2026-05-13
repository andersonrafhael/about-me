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
    tagline: "Gestão urbana georrefenciada para municípios.",
    description:
      "Sistema de gestão territorial com georeferenciamento, operação em campo, RBAC/ABAC e suporte multi-tenant para prefeituras. Ciclo completo: Planejamento → Projeto → Aprovação → Ordem Administrativa → Execução em Campo → Estoque → Inventário → Relatórios → Inteligência.",
    stack: ["Next.js", "Django", "PostGIS", "Supabase"],
    metrics: "Municípios no interior de Alagoas",
  },
  {
    slug: "sgtu",
    name: "SGTU",
    category: "GovTech",
    status: "ativo",
    tier: 1,
    tagline: "Gestão de transporte escolar para municípios.",
    description:
      "Plataforma multi-tenant de gestão de frota, rotas e estudantes para secretarias municipais de educação. Cobertura de todo o ciclo operacional: cadastro de alunos, definição de rotas, controle de frota e conformidade legal.",
    stack: ["Next.js", "Django", "Supabase"],
    metrics: "Estudantes com transporte rastreável",
  },
  {
    slug: "synapse-lab",
    name: "Synapse Lab",
    category: "IA",
    status: "beta",
    tier: 1,
    tagline: "PKM inteligente com IA — notas, projetos, RAG local.",
    description:
      "Workspace colaborativo de gestão de conhecimento pessoal com IA embarcada, RAG local e features Sonda (análise proativa) e Pulso (curadoria de contexto).",
    stack: ["Next.js", "Supabase", "Claude API"],
  },
  {
    slug: "rhema",
    name: "RHEMA",
    category: "Pesquisa",
    status: "ativo",
    tier: 1,
    tagline: "Engenharia formal de requisitos — framework Requiem Forge.",
    description:
      "Framework de hierarquia verificável, maturidade cumulativa e degradação temporal para requisitos de software. Pesquisa aplicada em engenharia de software.",
    stack: ["Next.js", "TypeScript"],
    url: "https://rhema.requiemcompany.com.br",
  },
  {
    slug: "microred",
    name: "MicroRed",
    category: "Infra",
    status: "beta",
    tier: 1,
    tagline: "Mobilidade elétrica e ESS com protocolo OCPP.",
    description:
      "Plataforma para gestão de redes de mobilidade elétrica com armazenamento de energia e integração OCPP. Mercado emergente sem solução equivalente no Nordeste.",
    stack: ["Django", "OCPP", "IoT"],
  },
  {
    slug: "sgdi",
    name: "SGDI",
    category: "GovTech",
    status: "beta",
    tier: 1,
    tagline: "Gestão de dispositivos cardíacos implantáveis.",
    description:
      "Sistema de rastreabilidade e gestão de dispositivos cardíacos para hospitais e secretarias de saúde. Conformidade regulatória e auditoria integrada.",
    stack: ["Django", "Next.js", "Supabase"],
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
      "Sistema de prevenção à evasão escolar — identificação precoce de risco e intervenção assistida por dados. Projeto financiado pelo MEC.",
    stack: ["Django", "Supabase", "ML"],
  },
  {
    slug: "cultbr",
    name: "CultBR",
    category: "GovTech",
    status: "ativo",
    tier: 2,
    role: "Gerente de Produto — NEES/UFAL",
    tagline: "Sistemas administrativos para gestão institucional cultural.",
    description:
      "Plataforma de governança institucional e gestão administrativa para entidades culturais públicas. Projeto do Ministério da Cultura.",
    stack: ["Next.js", "Django", "Supabase"],
  },
  {
    slug: "tela-brasil",
    name: "Tela Brasil",
    category: "GovTech",
    status: "beta",
    tier: 2,
    role: "Gerente de Produto — NEES/UFAL",
    tagline: "Plataforma audiovisual pública — acesso e acessibilidade.",
    description:
      "Plataforma de distribuição de conteúdo audiovisual público com foco em acessibilidade e políticas culturais. Parceria com o Ministério da Cultura.",
    stack: ["Next.js", "Django"],
  },
];
