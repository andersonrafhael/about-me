export type Publication = {
  title: string;
  venue: string;
  year: number;
  /** DOI sem prefixo de URL. */
  doi?: string;
  /** Link interno ou externo quando não há DOI. */
  href?: string;
  authors: string;
  lang: "pt-BR" | "en";
  note?: string;
};

/**
 * Artigos publicados em coautoria no âmbito do NEES/UFAL. Títulos e DOIs
 * conferidos nos anais (TU Delft OJS, SOL/SBC) em 21/08/2026.
 */
export const published: Publication[] = [
  {
    title:
      "A federated digital platform as infrastructure for governance, monitoring, and transparency in cultural funding",
    venue:
      "DG.O 2026 — 27th Annual International Conference on Digital Government Research",
    year: 2026,
    href: "/escrita/cultbr-plataforma-federativa-dgo2026",
    authors: "Coautoria · NEES/UFAL e Ministério da Cultura",
    lang: "en",
    note: "Anais em publicação. Leitura comentada no artigo 93,4% aderiram. 50,2% executaram.",
  },
  {
    title:
      "Digital Platform Government in the Promotion of Brazilian Audiovisual Content",
    venue:
      "DG.O 2025 — 26th Annual International Conference on Digital Government Research",
    year: 2025,
    doi: "10.59490/dgo.2025.1050",
    authors:
      "Lorena Abs, Anderson Barbosa, Vivian Pontes, Julia G. L. da Rosa, Aluísio Rego, Thiago Cordeiro, Luciana P. Santa Rita, Adriana Gomes, Lina Távora, Daniela F. Fernandes",
    lang: "en",
    note: "Track Digital Platform Government and Core Public Values.",
  },
  {
    title:
      "Plataforma Pública de Conteúdos Audiovisuais Brasileiros Sob Demanda: tecnologia social para formação de públicos, difusão e descentralização dos espaços de exibição",
    venue: "DG.O 2025 — Dialogues about Latin America",
    year: 2025,
    doi: "10.59490/dgo.2025.1057",
    authors:
      "Luciana Santa Rita, Thiago Cordeiro, Anderson Barbosa, Natalício Santos Junior, Christiane Cabral, Julia Rosa, Aluísio Rego, Vitor Braga, Adriana Gomes, Lina Távora, Daniela Fernandes",
    lang: "pt-BR",
  },
  {
    title:
      "Implementação de um Modelo Matemático para Geração de Sinais Analógicos de ECG Sintético Utilizando Hardware de Baixo Custo",
    venue:
      "SBCAS 2025 — XXV Simpósio Brasileiro de Computação Aplicada à Saúde",
    year: 2025,
    doi: "10.5753/sbcas.2025.7861",
    authors:
      "Walmer A. Cavalcante, Anderson R. G. Barbosa, Thiago D. Cordeiro, Erick A. Barboza",
    lang: "pt-BR",
  },
];

export type PipelineStatus = "escrita" | "corpus" | "fila" | "ideacao";

export const pipelineStatusLabel: Record<PipelineStatus, string> = {
  escrita: "em escrita",
  corpus: "corpus consolidado",
  fila: "na fila",
  ideacao: "em ideação",
};

export type PipelineItem = {
  title: string;
  product: string;
  venue: string;
  status: PipelineStatus;
  when?: string;
  detail: string;
};

/** Rota vigente (DEC-002, 02/07/2026): RHEMA → ICSE-SEIP 2027 é a única trilha ativa. */
export const pipeline: PipelineItem[] = [
  {
    title:
      "RHEMA: requisitos com hierarquia verificável, validade temporal e maturidade composta",
    product: "Requiem Forge · RHEMA",
    venue: "ICSE-SEIP 2027 — Software Engineering in Practice",
    status: "escrita",
    when: "submissão em outubro de 2026",
    detail:
      "Três modelos formais (RHM, RDM, RQM) aplicados a sistemas multi-tenant de gestão pública. Rota única do portfólio: é o único benchmark de pesquisa inteiramente sob controle do autor, sem depender de cliente ou comitê externo.",
  },
  {
    title:
      "Sistemas de gestão de dispositivos implantáveis em hospitais públicos: revisão sistemática",
    product: "SGDI",
    venue: "JBI Evidence Synthesis",
    status: "corpus",
    detail:
      "Corpus consolidado, zero referências fabricadas. A escrita entra depois do paper RHEMA.",
  },
  {
    title: "Avaliação do SGDI em hospital público de referência cardiológica",
    product: "SGDI",
    venue: "SBCAS ou periódico da área",
    status: "fila",
    when: "2027 em diante",
    detail:
      "Depende de stakeholder institucional e de comitê de ética hospitalar. Não passa à frente da rota vigente.",
  },
  {
    title:
      "OCPP 2.0.1 e armazenamento de energia em redes de recarga no Nordeste",
    product: "MicroRED",
    venue: "IEEE Access",
    status: "ideacao",
    detail:
      "Interoperabilidade, latência e gestão de carga em mercado sem solução equivalente na região.",
  },
  {
    title:
      "Documentation Architecture Framework: docs-as-code para software público de longa duração",
    product: "Requiem Forge",
    venue: "REFSQ 2027 Industry · ICSE-SEIP",
    status: "ideacao",
    detail:
      "Como a metodologia que sustenta o portfólio combate o abandono de sistemas públicos depois da entrega.",
  },
];

export const interests = [
  "Engenharia de requisitos formal em contextos de GovTech",
  "Sistemas de informação para gestão pública municipal brasileira",
  "Arquitetura multi-tenant em domínios institucionais e regulados",
  "HealthTech: ciclo de vida de dispositivos implantáveis, rastreabilidade e LGPD",
  "Permanência escolar e tecnologia social",
  "Mobilidade elétrica e eletrificação de frotas públicas",
  "IA aplicada a serviços públicos: LLM, RAG e agentes em domínio regulado",
] as const;

export const affiliation = {
  university: "Universidade Federal de Alagoas (UFAL)",
  unit: "NEES — Núcleo de Excelência em Tecnologias Sociais, Instituto de Computação",
  degree: "Engenharia da Computação",
} as const;
