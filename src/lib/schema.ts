import { absoluteUrl, sameAs, site } from "./site";

/**
 * The canonical Person entity. Every other schema block references it by @id
 * rather than repeating the details, which is what lets search engines resolve
 * "Arun Kumar Pulapa" on a blog post to the same person as the homepage.
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: site.alternateNames,
  jobTitle: site.jobTitle,
  description:
    "Freelance full stack developer building web applications, SaaS dashboards and REST APIs with React, Angular, Node.js, Express and MySQL since 2021.",
  url: site.url,
  image: absoluteUrl(site.defaultImage),
  email: `mailto:${site.email}`,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.country,
  },
  worksFor: {
    "@type": "Organization",
    name: "Valethi Technologies",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sasi Institute of Technology & Engineering",
  },
  knowsAbout: site.knowsAbout,
  sameAs,
};

/**
 * ProfilePage is the type Google uses for "this page is about a person".
 * Pairing it with the Person @id is what makes a name query resolve here
 * rather than to some other Arun Kumar.
 */
export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profilepage`,
  url: site.url,
  name: `${site.name} — ${site.jobTitle}`,
  dateModified: new Date().toISOString().slice(0, 10),
  mainEntity: { "@id": `${site.url}/#person` },
  about: { "@id": `${site.url}/#person` },
  inLanguage: "en",
};

/** Breadcrumbs give the SERP a readable path and reinforce site structure. */
export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: `${site.url}${crumb.path}`,
  })),
});

/** The freelance offer, attached to the same Person entity. */
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: `${site.name} — Full Stack Development`,
  url: site.url,
  image: absoluteUrl(site.defaultImage),
  email: site.email,
  founder: { "@id": `${site.url}/#person` },
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.country,
  },
  knowsAbout: site.knowsAbout,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Full stack development services",
    itemListElement: [
      "Full stack web app development",
      "SaaS dashboards & admin panels",
      "Responsive websites & landing pages",
      "Backend APIs & integration",
      "Bug fixes, refactoring & performance",
      "Ongoing development support",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};
