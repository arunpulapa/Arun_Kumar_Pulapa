/**
 * Single source of truth for anything that appears in page metadata or
 * structured data. Change it here, not in index.html or a component.
 */
export const site = {
  url: "https://pulapaarunkumar.online",
  name: "Pulapa Arun Kumar",
  /** Used in <title> suffixes and og:site_name. */
  shortName: "Pulapa Arun Kumar",
  jobTitle: "Freelance Full Stack Developer (React, Angular & Node.js)",
  email: "pulapaarunaa@gmail.com",
  /** E.164 for tel: links; `phoneDisplay` is what humans read. */
  phone: "+919515748486",
  phoneDisplay: "+91 95157 48486",
  linkedin: "https://www.linkedin.com/in/pulapa-arun-kumar-1a332b204",
  location: {
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
    timezone: "IST (UTC+5:30)",
  },
  /** First paid role (ADQ Services, Sep 2021) — experience is derived from it. */
  careerStart: new Date("2021-09-01"),
  defaultImage: "/og-image.png",

  /**
   * Every profile that belongs to this person. `sameAs` is how search engines
   * disambiguate one "Arun Kumar" from another, so more entries = stronger
   * identity resolution. ACTION: add GitHub / X / dev.to when available.
   */
  profiles: {
    linkedin: "https://www.linkedin.com/in/pulapa-arun-kumar-1a332b204",
    github: "" as string,
    x: "" as string,
    devto: "" as string,
  },

  alternateNames: ["Arun Kumar Pulapa", "Arun Pulapa", "Arun Kumar", "Pulapa Arun"],

  knowsAbout: [
    "React", "Angular", "TypeScript", "JavaScript", "Tailwind CSS",
    "Responsive Web Design", "REST API Integration", "SaaS Dashboards",
    "Frontend Performance", "Figma to Code", "Redux", "RxJS", "Node.js",
    "Express", "MySQL", "REST API Design", "Full-Stack Development", "CI/CD",
  ],
} as const;

/** Whole years since the first paid role — "5+" style, never rounded up. */
export const yearsOfExperience = () =>
  Math.floor((Date.now() - site.careerStart.getTime()) / (365.25 * 24 * 3600 * 1000));

/** Non-empty profile URLs, for schema.org `sameAs`. */
export const sameAs = Object.values(site.profiles).filter(Boolean);

export const absoluteUrl = (path: string) =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
