import { site } from "@/data/site";

const PERSON_ID = `${site.url}/#person`;
const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

type JsonLd = Record<string, unknown>;

/** Grafo raiz: Person + Organization + WebSite ligados por @id. Injetado no layout. */
export function rootGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        alternateName: site.fullName,
        url: site.url,
        email: `mailto:${site.email}`,
        description: site.longDescription,
        jobTitle: "Engenheiro de computação e fundador",
        worksFor: { "@id": ORG_ID },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidade Federal de Alagoas",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Maceió",
          addressRegion: "AL",
          addressCountry: "BR",
        },
        knowsAbout: [
          "GovTech",
          "Engenharia de requisitos",
          "Sistemas multi-tenant para gestão pública",
          "Sinalização viária",
          "Transporte universitário",
          "Dispositivos implantáveis",
          "Mobilidade elétrica",
        ],
        sameAs: [site.github, site.linkedin],
      },
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.company.name,
        foundingDate: String(site.company.founded),
        founder: { "@id": PERSON_ID },
        description: site.company.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Maceió",
          addressRegion: "AL",
          addressCountry: "BR",
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: site.url,
        name: site.name,
        inLanguage: site.language,
        publisher: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
      },
    ],
  };
}

export function breadcrumb(items: { name: string; path?: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: `${site.url}${it.path}` } : {}),
    })),
  };
}

export function collectionPage(opts: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: site.language,
  };
}

export function blogPosting(opts: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    inLanguage: site.language,
    keywords: opts.tags.join(", "),
    timeRequired: `PT${opts.readTime}M`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: `${site.url}/escrita/${opts.slug}`,
    image: `${site.url}/escrita/${opts.slug}/opengraph-image`,
    isPartOf: { "@id": SITE_ID },
  };
}

export function creativeWork(opts: {
  slug: string;
  name: string;
  description: string;
  role: string;
  /** `nees` = gestão de produto em plataforma de terceiros: nunca `creator`. */
  group: "requiem" | "nees" | "infra";
  institution?: string;
  url?: string;
}): JsonLd {
  const authorship =
    opts.group === "nees"
      ? {
          contributor: { "@id": PERSON_ID },
          ...(opts.institution
            ? { sourceOrganization: { "@type": "Organization", name: opts.institution } }
            : {}),
        }
      : { creator: { "@id": PERSON_ID }, author: { "@id": PERSON_ID } };
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: `${site.url}/projetos/${opts.slug}`,
    ...(opts.url ? { sameAs: [opts.url] } : {}),
    ...authorship,
    inLanguage: site.language,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Papel de Anderson Rafhael",
        value: opts.role,
      },
    ],
  };
}

export function profilePage(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": PERSON_ID },
    url: `${site.url}/sobre`,
    inLanguage: site.language,
  };
}

/** Serializa com `<` escapado — recomendação do guia JSON-LD do Next. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
