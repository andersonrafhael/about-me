import { media, type MediaItem } from "@/data/media";

export type ProjectStatus =
  "operacao" | "piloto" | "pre-producao" | "desenvolvimento" | "concepcao";
export type ProjectCategory =
  | "GovTech"
  | "HealthTech"
  | "Mobilidade"
  | "IA"
  | "Método"
  | "EdTech"
  | "Cultura";
export type ProjectGroup = "requiem" | "nees" | "infra";

export type ProjectLink = { label: string; href: string };
export type ProjectFact = { label: string; value: string; source?: string };

export type Project = {
  slug: string;
  name: string;
  /** Subtítulo curto que acompanha o nome (ex.: "Passaporte Universitário"). */
  subtitle?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  group: ProjectGroup;
  /** Papel do Anderson — sempre explícito. */
  role: string;
  institution?: string;
  period: string;
  /** Uma linha para cards e listas. */
  tagline: string;
  /** 1–2 frases para a página de projetos. */
  summary: string;
  problem: string[];
  approach: string[];
  state: string[];
  learning: string[];
  facts?: ProjectFact[];
  stack: string[];
  links?: ProjectLink[];
  media?: MediaItem[];
  /** Posição na home (1 = primeiro). Ausente = não aparece em destaque. */
  featured?: number;
  related?: string[];
};

export const statusLabel: Record<ProjectStatus, string> = {
  operacao: "em operação",
  piloto: "em piloto",
  "pre-producao": "pré-produção",
  desenvolvimento: "em desenvolvimento",
  concepcao: "em concepção",
};

export const statusTone: Record<ProjectStatus, "live" | "warm" | "neutral"> = {
  operacao: "live",
  piloto: "warm",
  "pre-producao": "warm",
  desenvolvimento: "neutral",
  concepcao: "neutral",
};

export const groupLabel: Record<
  ProjectGroup,
  { title: string; detail: string }
> = {
  requiem: {
    title: "Requiem Company",
    detail: "fundador, arquiteto, product owner",
  },
  nees: {
    title: "NEES / UFAL",
    detail: "gestão de produto em política pública federal",
  },
  infra: {
    title: "Infraestrutura interna",
    detail: "como uma pessoa opera um portfólio",
  },
};

export const projects: Project[] = [
  // ── Requiem Company — fundador ─────────────────────────────────────────
  {
    slug: "sigma",
    name: "Sigma",
    category: "GovTech",
    status: "piloto",
    group: "requiem",
    role: "Fundador, arquiteto e product owner",
    period: "2025 — hoje",
    featured: 1,
    tagline:
      "Gestão de sinalização viária para municípios: do contrato à placa instalada, num só ciclo.",
    summary:
      "Plataforma que leva a sinalização viária do projeto à prova de instalação em campo, com inventário georreferenciado permanente. Dá ao gestor o que hoje não existe: quantas placas tem, onde estão, em que estado e se cumprem CONTRAN e ABNT.",
    problem: [
      "Prefeituras não sabem quantas placas têm, onde estão nem em que estado. O dado nasce no projeto viário em CAD, some durante a execução e nunca vira inventário. Sem inventário não há manutenção planejada, a prestação de contas é reconstruída depois e cada gestão recomeça do zero.",
      "O setor técnico, a equipe de campo, o almoxarifado, os contratos e quem decide trabalham em ferramentas separadas. A placa instalada ontem e o contrato que a pagou raramente se encontram no mesmo sistema.",
    ],
    approach: [
      "Um ciclo operacional único sobre uma base georreferenciada permanente: planejamento, projeto, aprovação, ordem administrativa, execução em campo, estoque, inventário, relatórios e inteligência. O app de campo registra foto e valida a posição; contratos, insumos e equipes vivem no mesmo modelo de dados.",
      "Multi-tenant por município e RBAC/ABAC desde a fundação. Tecnicamente, o Sigma ocupa a camada de informação urbana entre o GIS (dado espacial) e o BIM (modelo de ativo), com conformidade normativa tratada como regra executável, não como PDF anexo.",
    ],
    state: [
      "Piloto em andamento com dados reais de sinalização importados de uma capital do Nordeste; fundação de tenancy em finalização. Nenhum município é anunciado como implantado antes do go-live: sem contrato publicado, o número honesto é zero.",
    ],
    learning: [
      "Vocabulário pesa tanto quanto arquitetura. O onboarding deixou de ser convite por token e virou cadastro e complementação cadastral, o fluxo que o servidor público reconhece do gov.br. Custou pouco e removeu uma cerimônia de SaaS que atrapalhava o município pequeno.",
      "Estudar quem faz o projeto viário em CAD definiu a fronteira do produto: o Sigma não disputa o nascimento do dado; é o destino dele, o ciclo de vida que as ferramentas de projeto não cobrem.",
    ],
    facts: [
      { label: "Ciclo", value: "9 etapas, do planejamento à inteligência" },
      {
        label: "Arquitetura",
        value: "multi-tenant · RBAC/ABAC · georreferenciado",
      },
      { label: "Normas", value: "CONTRAN · ABNT como regra executável" },
    ],
    stack: [
      "React",
      "Django · DRF",
      "PostGIS",
      "Docker · Traefik",
      "Cloudflare",
    ],
    links: [
      {
        label: "sigma.requiemcompany.com.br",
        href: "https://sigma.requiemcompany.com.br",
      },
    ],
    media: [
      media.sigmaLanding,
      media.sigmaPainelEstudo,
      media.sigmaGestaoEstudo,
    ],
    related: ["unipass", "requiem-forge", "rhema"],
  },
  {
    slug: "unipass",
    name: "UniPass",
    subtitle: "Passaporte Universitário",
    category: "Mobilidade",
    status: "pre-producao",
    group: "requiem",
    role: "Fundador, arquiteto e product owner",
    period: "2025 — hoje",
    featured: 2,
    tagline:
      "Transporte universitário municipal com rastreabilidade de ponta a ponta: cadastro, rotas, operação do dia e carteirinha digital.",
    summary:
      "Plataforma multi-tenant que coordena cadastro, alocação e operação do transporte universitário de um município, com gestão web, app do estudante e app do motorista. A expansão para o transporte escolar vem depois do UniPass operar plenamente.",
    problem: [
      "Municípios do interior levam milhares de estudantes a universidades de outras cidades todos os dias com planilha, grupo de WhatsApp e confirmação verbal. Não há registro confiável de quem embarcou, de qual veículo rodou nem de quanto custou. A prestação de contas é montada depois, de memória.",
      "É o problema de gestão mais complexo do município médio: segurança de gente jovem, logística em tempo real, contrato com empresa privada de transporte e prestação de contas a órgão de controle. Quase nenhuma empresa de software quer construir isso.",
    ],
    approach: [
      "Três superfícies sobre um backend único: gestão web para a secretaria, app do estudante (carteirinha com QR e confirmação de viagem) e app do motorista (embarque). Multi-tenant por município, RBAC em três gates, auditoria e exclusão lógica.",
      "Antes do gate de produção: 1.450 testes no backend, 507 no app e 12 fluxos ponta a ponta no navegador, além de auditoria funcional independente. Observabilidade com OpenTelemetry desde o primeiro ambiente.",
    ],
    state: [
      "Gate de produção aprovado em junho de 2026. Primeira implantação municipal em preparação, em Alagoas. O transporte escolar entra como extensão quando o universitário estiver em operação plena.",
    ],
    learning: [
      "A auditoria funcional encontrou 43 problemas que a suíte de testes não via, quase todos na costura entre partes construídas em momentos diferentes. Integração virou requisito com dono, não efeito colateral; a lição entrou no método de todos os projetos seguintes.",
    ],
    facts: [
      { label: "Testes", value: "1.450 backend · 507 app · 12 E2E" },
      {
        label: "Superfícies",
        value: "gestão web · app do estudante · app do motorista",
      },
      { label: "Gate de produção", value: "aprovado em jun/2026" },
    ],
    stack: [
      "Django 5 · DRF",
      "PostGIS",
      "Next.js",
      "Expo · React Native",
      "Celery",
      "OpenTelemetry",
    ],
    links: [
      {
        label: "unipass.requiemcompany.com.br",
        href: "https://unipass.requiemcompany.com.br",
      },
    ],
    media: [media.unipassLanding, media.unipassPainelDemo, media.unipassLogin],
    related: ["sigma", "rhema"],
  },
  {
    slug: "sgdi",
    name: "SGDI",
    subtitle: "Sistema de Gestão de Dispositivos Implantáveis",
    category: "HealthTech",
    status: "desenvolvimento",
    group: "requiem",
    role: "Fundador e arquiteto",
    institution:
      "Piloto com hospital público parceiro, em Maceió · arranjo via IC/UFAL",
    period: "2026 — hoje",
    featured: 3,
    tagline:
      "O ciclo de vida de quem carrega um dispositivo implantável: do lote no estoque à consulta de retorno, anos depois.",
    summary:
      "Vertical de saúde da Requiem. Acompanha o portador de marcapasso, CDI ou ressincronizador da entrada do lote no almoxarifado ao seguimento clínico, com a instituição e o paciente nas duas pontas. Rastreabilidade e recall são consequências do ciclo, não o propósito dele.",
    problem: [
      "Quem carrega um marcapasso depende de uma cadeia que o hospital público não enxerga inteira: o lote que entrou no estoque, o implante em sala, a bateria que vai acabar numa data previsível, a emergência em que saber qual é o dispositivo muda o socorro, o recall raro. Cada elo vive num sistema ou numa planilha diferente.",
    ],
    approach: [
      "Cinco contextos delimitados sobre um banco com isolamento por hospital em Row Level Security, forçada na mesma migração que cria cada tabela. Trilha de auditoria append-only por trigger e saída de eventos sem dado pessoal, por catálogo fechado (LGPD, art. 11).",
      "O contrato de API é escrito à mão e é a fonte de verdade: o front gera tipos a partir dele e o backend é cobrado em CI de reproduzi-lo. O isolamento entre hospitais foi validado com defeito plantado, não com confiança.",
    ],
    state: [
      "Backend S0 entregue. Validação de campo concluída em julho de 2026 com um hospital público de referência cardiológica em Alagoas, parceiro do piloto: 27 de 27 respostas, sete achados que mudaram decisões de produto. Arranjo institucional via IC/UFAL em avaliação; sem contrato assinado.",
    ],
    learning: [
      "A tese mudou na validação. Recall é o caso excepcional de uma máquina cujo caso normal é muito maior: o evento que traz o paciente de volta de forma previsível é o fim de vida da bateria, certo, agendável e sem pânico. Projetar para o caso normal tornou o sistema útil todo dia, e não só na crise.",
    ],
    facts: [
      {
        label: "Isolamento",
        value: "RLS por hospital, validado com defeito plantado",
      },
      { label: "Auditoria", value: "append-only por trigger" },
      { label: "Validação de campo", value: "27/27 respostas · jul/2026" },
    ],
    stack: [
      "Django 5 · DRF",
      "Next.js",
      "PostgreSQL · RLS",
      "Contrato de API como fonte de verdade",
    ],
    related: ["sigma", "rhema", "requiem-forge"],
  },
  {
    slug: "microred",
    name: "MicroRED",
    category: "Mobilidade",
    status: "operacao",
    group: "requiem",
    role: "Fundador",
    period: "2024 — hoje",
    featured: 4,
    tagline:
      "Gestão de eletropostos, app de recarga e armazenamento de energia sobre o protocolo OCPP.",
    summary:
      "Plataforma de gestão de estações de recarga, aplicativo para o usuário final e gateway OCPP, com o armazenamento de energia (ESS) tratado como ativo do mesmo sistema. Mercado tecnicamente difícil, dominado por fornecedores importados.",
    problem: [
      "Operar um eletroposto é falar um protocolo com hardware de vários fabricantes, autorizar quem carrega, medir kWh em tempo real, cobrar e manter tudo ligado num posto, condomínio ou shopping que não tem equipe de TI. Com bateria própria, entram ainda a arbitragem tarifária e o corte de pico de demanda.",
    ],
    approach: [
      "Plataforma de gestão para operador e cliente, app de recarga e gateway OCPP 1.6J e 2.0.1 sobre WebSocket, com simulador de carregador documentado para desenvolvimento e homologação. O ESS entra no mesmo modelo: carrega na tarifa baixa, descarrega no pico e equilibra a geração solar quando existe.",
    ],
    state: [
      "Produtos em operação, com site público e ambientes de produção. A frente de pesquisa da Requiem (simulador OCPP e material de pitch para edital) está pausada desde junho de 2026 por decisão de foco.",
    ],
    learning: [
      "Deploy hostil decide linguagem. Um gateway que roda onde não há TI precisa ser um binário que sobe sozinho e sustenta milhares de conexões WebSocket; foi isso, e não preferência, que fechou a decisão de arquitetura por Go no gateway.",
    ],
    facts: [
      { label: "Protocolo", value: "OCPP 1.6J · 2.0.1 sobre WebSocket" },
      { label: "Produtos", value: "gestão · app de recarga · simulador" },
      { label: "Energia", value: "ESS com arbitragem tarifária" },
    ],
    stack: ["OCPP", "WebSocket", "Django", "Go (gateway)", "ESS"],
    links: [{ label: "mred.com.br", href: "https://mred.com.br" }],
    media: [media.mredLanding, media.mredApp],
    related: ["sigma"],
  },
  {
    slug: "synapse-lab",
    name: "Synapse Lab",
    category: "IA",
    status: "desenvolvimento",
    group: "requiem",
    role: "Fundador e arquiteto",
    period: "2025 — hoje",
    tagline:
      "Gestão de conhecimento com IA embarcada e RAG local: notas, projetos e um workspace que devolve o que você já escreveu.",
    summary:
      "Workspace colaborativo de conhecimento com recuperação semântica local e síntese por modelo de linguagem sobre o próprio acervo. Dois subsistemas: Sonda, que busca e analisa o acervo, e Pulso, que mostra o estado do workspace.",
    problem: [
      "Ferramentas de notas guardam; não devolvem. Quem escreve muito acumula um acervo que nenhuma busca por palavra alcança, e as alternativas com IA mandam o acervo inteiro para fora.",
    ],
    approach: [
      "Recuperação semântica sobre pgvector, síntese por LLM restrita ao corpus do usuário e design system próprio, só em tema escuro. A decisão de onde roda a inferência é tratada como decisão de produto, porque o dono do dado é quem escreve.",
    ],
    state: [
      "Em desenvolvimento ativo na segunda arquitetura (workspace e RAG local). Uso interno antes de qualquer abertura.",
    ],
    learning: [
      "RAG em acervo pessoal tem os mesmos cinco problemas do RAG em domínio regulado, descritos no artigo sobre compliance: granularidade, permissão, proveniência, atualidade e alucinação com cara de citação.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Supabase · pgvector",
      "Django · DRF",
      "Claude API",
    ],
    related: ["rhema", "requiem-forge"],
  },
  {
    slug: "rhema",
    name: "RHEMA",
    subtitle: "Requiem Hierarchy Excellence Maturity Artifact",
    category: "Método",
    status: "operacao",
    group: "requiem",
    role: "Criador",
    period: "2025 — hoje",
    tagline:
      "Framework de engenharia de requisitos com três modelos formais: hierarquia, decaimento temporal e qualidade.",
    summary:
      "Requisitos com posição estrutural verificável, validade temporal explícita e maturidade composta. Seis tipos de artefato, validador em linha de comando e guia de adoção, standalone ou integrado ao Requiem Forge. Base do paper em escrita para o ICSE-SEIP 2027.",
    problem: [
      "Requisitos em sistemas públicos envelhecem, se contradizem e perdem dono. Um documento aprovado em 2024 continua governando código em 2026 sem que ninguém saiba o que ainda vale. Sem hierarquia verificável nem validade temporal, maturidade vira adjetivo.",
    ],
    approach: [
      "Três modelos independentes e compostos: RHM, que dá a posição estrutural e o invariante de folha; RDM, que dá a validade temporal em cinco estados; e RQM, que compõe tier, posição e decaimento num só índice. Templates de frontmatter, validador e especificação normativa versionada.",
    ],
    state: [
      "Framework em produção dentro do Requiem Forge (RQM v1.4.1, RHM v1.2.1, RDM v1.1.0), instrumentado em dois projetos do portfólio. Paper em escrita; submissão ao ICSE-SEIP 2027 em outubro de 2026.",
    ],
    learning: [
      "Separar hierarquia de decaimento foi a virada. São eixos ortogonais, e tratá-los num único índice escondia justamente os requisitos que mais precisavam de revisão.",
    ],
    facts: [
      { label: "Modelos", value: "RHM · RDM · RQM" },
      { label: "Artefatos", value: "HU · RF · RN · RNF · UC · RR" },
      { label: "Paper", value: "ICSE-SEIP 2027 · submissão em out/2026" },
    ],
    stack: [
      "Markdown normativo",
      "YAML frontmatter",
      "Python (validador)",
      "IEEE 29148",
    ],
    related: ["requiem-forge", "sigma", "unipass"],
  },

  // ── Infraestrutura interna ─────────────────────────────────────────────
  {
    slug: "requiem-forge",
    name: "Requiem Forge",
    category: "Método",
    status: "operacao",
    group: "infra",
    role: "Criador",
    period: "2025 — hoje",
    tagline:
      "Harness de desenvolvimento dirigido por especificação, Claude-first e multimodelo. A metodologia que padroniza todo o resto.",
    summary:
      "Spec Driven Development como paradigma: toda tarefa é dimensionada, especificada e validada por gates mecânicos antes de valer como pronta. Regras, hooks, agentes e templates versionados e propagados a cada projeto. Com ele vêm o Lumen OS, a Requiem Intelligence e o DevOps Core.",
    problem: [
      "Software público morre por falta de método, não de código: requisitos sem dono, decisões sem registro, qualidade dependente de quem está de plantão. Com agentes escrevendo código, a lacuna entre quem especifica e quem implementa virou risco operacional.",
    ],
    approach: [
      "Tamanho antes de processo (XS a L), especificação com problema, restrições e critério de aceite, e um gate mecânico que roda fora do modelo: tipos, lint, build, testes. Revisão em contexto limpo separada de quem implementou. Toda execução autônoma longa exige contrato de terminação com condição de saída executável e tetos.",
      "Três peças de infraestrutura operam o portfólio por baixo do Forge. Lumen OS, a camada zero local-first que lê repositórios, vault e disco e visualiza, monitora e audita tudo. Requiem Intelligence, que escreve um relatório semanal com sete métricas sobre o portfólio inteiro. DevOps Core, o PaaS interno que leva os produtos à produção com rotas, DNS e certificados.",
    ],
    state: [
      "Versão 6.8.0, em uso em todos os projetos do portfólio, inclusive neste site: o gauntlet de qualidade que o valida (Lighthouse, axe, SEO, teclado, links) é um contrato de terminação do Forge, validado antes da primeira rodada.",
    ],
    learning: [
      "Gate probabilístico não bloqueia. Revisão por IA levanta aviso; quem bloqueia é o humano que leu o aviso ou o teste determinístico que o aviso levou a escrever. Essa separação de classes eliminou tanto os falsos bloqueios quanto a fé cega.",
    ],
    facts: [
      { label: "Versão", value: "6.8.0" },
      {
        label: "Camadas",
        value: "Forge · Lumen OS · Requiem Intelligence · DevOps Core",
      },
      { label: "Adaptadores", value: "Claude Code · Codex · OpenCode" },
    ],
    stack: [
      "Claude Code",
      "Markdown + hooks",
      "Python",
      "Playwright",
      "Lighthouse",
    ],
    related: ["rhema", "sigma", "sgdi"],
  },

  // ── NEES / UFAL — gestão de produto ────────────────────────────────────
  {
    slug: "cultbr",
    name: "CultBR",
    category: "Cultura",
    status: "operacao",
    group: "nees",
    role: "Gerente de produto do módulo de Gestão (até jun/2026); apoio técnico desde então",
    institution: "NEES/UFAL · Ministério da Cultura",
    period: "2025 — 2026",
    tagline:
      "Backoffice da Política Nacional Aldir Blanc: planos de ação, execução e prestação de contas de todos os entes federativos.",
    summary:
      "Sistema administrativo do Ministério da Cultura para operar a PNAB com União, estados, Distrito Federal e municípios. Anderson foi gerente de produto do módulo de Gestão no NEES/UFAL: requisitos, roadmap, ciclo de lançamento e articulação com o Ministério.",
    problem: [
      "A Lei 14.399/2022 descentraliza recursos da cultura para todos os entes federativos e exige planos de ação com metas e cotas. Antes, adesão, execução e monitoramento corriam em processos manuais que não se falavam; o Ministério só via o resultado depois.",
    ],
    approach: [
      "Segregação entre Rede (quem executa no ente) e Gestão (quem analisa no Ministério), RBAC em três camadas, trilha de auditoria e exportação para órgãos de controle e pesquisadores. Acesso por gov.br.",
    ],
    state: [
      "Em produção em domínio federal. O artigo publicado no DGO 2026 analisa a plataforma como infraestrutura de governança: 93,4% dos entes aderiram ao planejamento e R$ 2,98 bilhões foram transferidos pela plataforma (Ministério da Cultura, 2024; TCU, 2025).",
    ],
    learning: [
      "O intervalo entre adesão (93,4%) e execução (50,2%) não é falha do sistema. É o que ele tornou visível pela primeira vez: infraestrutura digital de política pública mede antes de melhorar.",
    ],
    facts: [
      {
        label: "Adesão",
        value: "93,4% dos entes federativos",
        source: "DGO 2026, Tabela 1",
      },
      {
        label: "Transferido",
        value: "R$ 2,98 bilhões",
        source: "MinC 2024 · TCU 2025",
      },
      { label: "Escala", value: "União · 26 estados · DF · municípios" },
    ],
    stack: ["Next.js", "Django", "PostgreSQL", "gov.br"],
    links: [
      { label: "cultbr.cultura.gov.br", href: "https://cultbr.cultura.gov.br" },
      {
        label: "Artigo: 93,4% aderiram. 50,2% executaram.",
        href: "/escrita/cultbr-plataforma-federativa-dgo2026",
      },
    ],
    media: [media.cultbrLogin],
    related: ["spte-iafree"],
  },
  {
    slug: "spte-iafree",
    name: "SPTE / IAFREE",
    subtitle: "Sistema de Proteção de Trajetórias Escolares",
    category: "EdTech",
    status: "operacao",
    group: "nees",
    role: "Gerente de produto",
    institution: "NEES/UFAL · Ministério da Educação (TED 10974)",
    period: "2025 — hoje",
    tagline:
      "Proteção de trajetórias escolares: diagnóstico, monitoramento e intervenção antes do abandono.",
    summary:
      "Instrumento de diagnóstico (IAFREE-A: 46 itens, 5 dimensões, 14 fatores) e plataforma de acompanhamento para redes e escolas, com escopo nacional do MEC. Anderson é gerente de produto: requisitos, roadmap e articulação com as redes parceiras.",
    problem: [
      "A evasão escolar só fica visível quando já aconteceu. Frequência, desempenho e contexto familiar vivem em bases que não se cruzam, e a escola descobre o abandono na matrícula do ano seguinte.",
    ],
    approach: [
      "Aplicação do instrumento em campo, painel por escola e por turma com resultados agregados (sem exposição individual, LGPD art. 14) e plano de ações de proteção acompanhado pela rede.",
    ],
    state: [
      "Aplicação de campo concluída entre novembro e dezembro de 2025 em três municípios do Maranhão: 10 escolas, 29 turmas, 610 estudantes. Devolutiva institucional entregue às escolas em junho de 2026. Plataforma em desenvolvimento ativo.",
    ],
    learning: [
      "Um instrumento validado vale mais do que um painel bonito. A credibilidade com a escola veio da devolutiva que ela conseguia usar na reunião seguinte, não do gráfico.",
    ],
    facts: [
      {
        label: "Campo",
        value: "3 municípios · 10 escolas · 29 turmas · 610 estudantes",
      },
      {
        label: "Instrumento",
        value: "IAFREE-A · 46 itens · 5 dimensões · 14 fatores",
      },
      { label: "Instrumento federal", value: "TED 10974 · MEC via UFAL" },
    ],
    stack: ["Next.js 15", "React 19", "Tailwind v4", "Django"],
    media: [media.sptePainelDemo, media.spteIafreeDemo],
    related: ["cultbr"],
  },
];

/** Produtos em concepção ou fora do foco atual — sem página própria, por decisão. */
export const concepts = [
  {
    name: "CIRIS",
    detail:
      "Central Intelligence for Reporting & Insight Systems: a camada de inteligência executiva sobre os sistemas operacionais (Sigma, UniPass). Próximo produto depois dos dois estarem em operação. Em concepção.",
  },
  {
    name: "Financial Hub",
    detail:
      "Diagnóstico financeiro para PMEs na perspectiva do assessor, com um índice aberto (FHS Score). Primeira fase em desenvolvimento; fora do foco atual.",
  },
  {
    name: "ChatDigi e Nexus",
    detail:
      "Verticais de comunicação automatizada e de integração, em operação interna, sem exposição pública.",
  },
] as const;

export const featuredProjects = projects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));

export const projectsByGroup = (group: ProjectGroup) =>
  projects.filter((p) => p.group === group);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Slugs antigos → novos (redirecionados em next.config.ts). */
export const legacySlugs: Record<string, string> = { sgtu: "unipass" };
