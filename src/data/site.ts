export const site = {
  name: "Anderson Rafhael",
  fullName: "Anderson Rafhael de Gusmão Barbosa",
  url: "https://andersonrafhael.requiemcompany.com.br",
  title: "Anderson Rafhael — Engenheiro e fundador da Requiem Company",
  description:
    "Engenheiro de computação e fundador da Requiem Company, em Maceió. Infraestrutura digital para gestão pública, saúde e mobilidade: Sigma, UniPass, SGDI.",
  longDescription:
    "Engenheiro de computação e fundador da Requiem Company, em Maceió. Construo infraestrutura digital para gestão pública, saúde e mobilidade — plataformas que prefeituras, hospitais e universidades usam para operar serviços públicos.",
  locale: "pt_BR",
  language: "pt-BR",
  email: "rafha.barbosa98@gmail.com",
  github: "https://github.com/andersonrafhael",
  linkedin: "https://www.linkedin.com/in/andersonrafhael",
  repository: "https://github.com/andersonrafhael/about-me",
  location: "Maceió, Alagoas · Brasil",
  timeZone: "America/Fortaleza",
  birthDate: "1998-04-29",
  degree: "Engenharia da Computação — Universidade Federal de Alagoas",
  lema: "Que meu cansaço a outros descanse.",
  company: {
    name: "Requiem Company",
    founded: 2024,
    description:
      "Estúdio de tecnologia que constrói infraestrutura digital onde a complexidade institucional encontra resultado: sinalização viária, transporte universitário, dispositivos implantáveis, mobilidade elétrica. Sem capital externo, a partir de Maceió.",
  },
} as const;

export const hero = {
  eyebrow: "disponível para projetos · 2026",
  headline: "Infraestrutura digital",
  subline: {
    lead: "de ponta para",
    domains: ["gestão pública", "saúde", "mobilidade"],
  },
  dek: "Engenheiro de computação e fundador da Requiem Company. Construo as plataformas que prefeituras, hospitais e universidades usam para operar serviços públicos — de Maceió, sem capital externo, com produto e pesquisa no mesmo ciclo.",
  primaryCta: { label: "Ver projetos", href: "/projetos" },
  secondaryCta: { label: "Ler artigos", href: "/escrita" },
} as const;

/** Métricas do hero — todas verificáveis e com contexto de papel. */
export const heroMetrics = [
  { value: "R$ 0", label: "capital externo captado" },
  { value: "3", label: "verticais públicas · gestão, saúde, mobilidade" },
  { value: "4", label: "artigos em coautoria · NEES/UFAL" },
  { value: "2024", label: "Requiem Company · Maceió" },
] as const;

/** Instituições com as quais o trabalho se relaciona — sempre com o papel nomeado. */
export const institutions = [
  {
    name: "Ministério da Cultura",
    detail: "CultBR · gestão de produto (NEES/UFAL)",
  },
  {
    name: "Ministério da Educação",
    detail: "SPTE/IAFREE · gestão de produto (NEES/UFAL)",
  },
  { name: "UFAL · NEES", detail: "Núcleo de Excelência em Tecnologias Sociais · pesquisa e engenharia de software" },
  { name: "IC/UFAL", detail: "arranjo institucional do SGDI" },
  {
    name: "Rede pública de saúde de Alagoas",
    detail: "hospital parceiro do piloto SGDI",
  },
] as const;

/** Foco do trimestre — atualizado a cada sessão de revisão do site. */
export const now = {
  updatedAt: "2026-08-21",
  items: [
    {
      title: "Sigma",
      detail: "fundação multi-tenant e piloto com dados reais de sinalização",
    },
    {
      title: "UniPass",
      detail: "primeira implantação municipal em preparação, em Alagoas",
    },
    {
      title: "RHEMA",
      detail: "paper em escrita para o ICSE-SEIP 2027 (submissão em outubro)",
    },
    {
      title: "SGDI",
      detail:
        "corte de escopo após a validação de campo com o hospital parceiro",
    },
  ],
} as const;

export const manifesto = {
  quote:
    "Construo sistemas para decisões com consequência: a placa que foi instalada, o estudante que embarcou, a bateria que vai acabar numa data conhecida.",
  body: "A Requiem Company nasceu em 2024 com um objetivo: infraestrutura digital com densidade técnica e utilidade pública, financiada pelo próprio trabalho. Cada produto é também uma hipótese de pesquisa.",
  markers: [
    {
      label: "Sem capital externo",
      detail: "financiada pelo próprio trabalho desde o início",
    },
    {
      label: "Fora do eixo",
      detail: "Maceió como base, o Brasil municipal como campo",
    },
    {
      label: "Produto e pesquisa",
      detail: "o que vai para produção também vai para o paper",
    },
  ],
} as const;

export const timeline = [
  {
    year: "1998",
    title: "Alagoas",
    detail: "Nasce em 29 de abril. Cresce no estado onde hoje constrói.",
  },
  {
    year: "UFAL",
    title: "Engenharia da Computação",
    detail:
      "Formação na Universidade Federal de Alagoas; pesquisa no NEES, o Núcleo de Excelência em Tecnologias Sociais, no Instituto de Computação.",
  },
  {
    year: "2024",
    title: "Requiem Company",
    detail:
      "Funda o estúdio em Maceió, sem capital externo, para construir sistemas que instituições públicas usam para operar.",
  },
  {
    year: "2025",
    title: "Produto em política pública",
    detail:
      "Gestão de produto do CultBR (MinC) e do SPTE/IAFREE (MEC) no NEES/UFAL. Artigos no DGO 2025 e no SBCAS 2025. Aplicação de campo do IAFREE em três municípios do Maranhão.",
  },
  {
    year: "2026",
    title: "Três verticais em paralelo",
    detail:
      "Sigma em piloto; UniPass aprovado no gate de produção; SGDI validado em campo com hospital parceiro. Artigo sobre o CultBR no DGO 2026. Requiem Forge 6.8 e paper RHEMA em escrita para o ICSE-SEIP 2027.",
  },
] as const;

export const values = [
  "Excelência como dever",
  "Utilidade real",
  "Legado",
  "Estrutura antes de estética",
  "Responsabilidade",
  "Escala com sentido",
  "Serviço público",
  "Autonomia",
] as const;

export const channels = [
  {
    n: "01",
    label: "E-mail",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "resposta em até 24 h, seg–sex",
  },
  {
    n: "02",
    label: "LinkedIn",
    value: "linkedin.com/in/andersonrafhael",
    href: site.linkedin,
    hint: "perfil profissional",
  },
  {
    n: "03",
    label: "GitHub",
    value: "github.com/andersonrafhael",
    href: site.github,
    hint: "código aberto, inclusive este site",
  },
] as const;

export const conversations = [
  {
    title: "Prefeituras e secretarias",
    detail:
      "sinalização viária, transporte universitário, operação de campo com rastreabilidade.",
  },
  {
    title: "Hospitais e gestores de saúde",
    detail:
      "ciclo de vida de dispositivos implantáveis, estoque, implante e seguimento.",
  },
  {
    title: "Universidades e institutos",
    detail:
      "pesquisa aplicada em engenharia de requisitos e sistemas de informação pública.",
  },
  {
    title: "Imprensa",
    detail:
      "infraestrutura digital municipal fora do eixo, bootstrap, produto e pesquisa no mesmo ciclo.",
  },
] as const;
