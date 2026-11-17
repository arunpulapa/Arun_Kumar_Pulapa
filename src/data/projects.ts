/**
 * Portfolio project data, shared by the Projects section and the hero proof strip.
 */
import garoodaShot from "@/assets/work/garooda.webp";
import qwikbagShot from "@/assets/work/qwikbag.webp";
import akkineticShot from "@/assets/work/akkinetic.webp";
import nextgenVisualsShot from "@/assets/work/nextgenvisuals.webp";
import mimiverseEnergyShot from "@/assets/work/mimiverse-energy.webp";
import mimiverseMediaShot from "@/assets/work/mimiverse-media.webp";
import dreamvolveShot from "@/assets/work/dreamvolve.webp";
import aknextgenCard from "@/assets/work/aknextgen.webp";
import originsShot from "@/assets/work/origins.webp";
import iconfilersShot from "@/assets/work/iconfilers.webp";

export interface CaseStudy {
  title: string;
  /** The business need, in a client's words. */
  problem: string;
  /** What I personally did — never the whole team's work. */
  contribution: string;
  features: string[];
  technologies: string[];
  /** Where the work was done. */
  company: string;
  /** Only verified, reachable URLs. Omit for internal or client-confidential work. */
  link?: string;
}

export interface LiveSite {
  title: string;
  description: string;
  technologies: string[];
  type: string;
  link: string;
  /** Real above-the-fold capture of the live site (1440×900, scaled). */
  image?: string;
  /** Defaults to "Homepage of <title>". */
  imageAlt?: string;
}

/**
 * Product work. Contribution lines follow the résumé; internal products are
 * described without screenshots, client data, or proprietary detail.
 */
export const caseStudies: CaseStudy[] = [
  {
    title: "HRM SaaS platform",
    problem:
      "A growing company needed one web app to run HR operations: attendance, payroll, roles, and admin workflows.",
    contribution:
      "Led frontend development: architecture, reusable UI components, API integration, and performance tuning, working with a 3-person engineering team.",
    features: ["Attendance & payroll modules", "Role-based access and authentication", "Admin workflows"],
    technologies: ["Angular", "TypeScript", "Node.js", "REST APIs"],
    company: "AK NextGen Solutions",
  },
  {
    title: "US tax-filing platform",
    problem:
      "A tax-filing business needed a secure online flow for clients to file returns, plus tools for staff to manage them.",
    contribution:
      "Built the platform's frontend: authentication, multi-step tax form workflows, admin tools, and optimised UI flows.",
    features: ["Secure user authentication", "Multi-step tax form workflows", "Admin tools"],
    technologies: ["Angular", "Tailwind CSS", "Bootstrap"],
    company: "AK NextGen Solutions",
  },
  {
    title: "Lead & client management dashboard",
    problem:
      "A sales team needed to track leads, assign them to team members, and report on progress in one place.",
    contribution:
      "Developed the lead tracking, user roles, team assignment, and reporting modules, including dynamic charts and automation flows.",
    features: ["Lead tracking & assignment", "User roles & permissions", "Reporting with charts"],
    technologies: ["Angular", "Tailwind CSS", "Chart.js"],
    company: "AK NextGen Solutions",
  },
  {
    title: "Enquire — multi-domain search",
    problem:
      "One search product covering stocks, currency, dictionary, and translation, with financial data people can read at a glance.",
    contribution:
      "Developed the domain dashboards and interactive chart visualisations, optimised API responses, and added caching and unit tests.",
    features: ["Stock & currency dashboards", "Interactive charts", "Caching & unit tests"],
    technologies: ["Angular 15", "Angular Material", "Redux", "Chart.js"],
    company: "ADQ Services",
  },
  {
    title: "Farm Robo — farming dashboard",
    problem: "Operators needed to monitor agricultural machinery and drones from a single web dashboard.",
    contribution:
      "Built the monitoring dashboards and real-time data handling, and contributed backend services for data automation.",
    features: ["Machinery & drone monitoring", "Real-time state updates", "Data automation services"],
    technologies: ["React", "Redux", "MobX", "Node.js", "MySQL"],
    company: "ADQ Services",
  },
  {
    title: "Cotton Expert",
    problem:
      "Farmers needed a simple way to identify crop diseases from photos, including people more comfortable speaking than typing.",
    contribution:
      "Frontend developer: implemented the ML-powered image analysis flow and a multilingual voice assistant, and integrated backend APIs.",
    features: ["Image-based disease detection", "Multilingual voice assistant", "API integration"],
    technologies: ["Angular", "TypeScript", "SCSS", "Redux"],
    company: "ADQ Services",
  },
];


/**
 * Live sites I built. Links checked and screenshots captured from the live
 * sites on 2026-10-10 — recapture when a site is redesigned.
 */
export const liveSites: LiveSite[] = [
  {
    title: "Garooda Mobiles",
    description:
      "Website for a phone repair shop: services, pricing, reviews, and repair booking with WhatsApp contact.",
    technologies: ["React", "Tailwind CSS", "Node.js", "REST API"],
    type: "Local business",
    link: "https://garoodamobiles.com/",
    image: garoodaShot,
  },
  {
    title: "Icon Filers",
    description:
      "Website for a US tax-filing service: services, pricing, a refund estimator, and client sign-up and sign-in.",
    technologies: ["Angular", "TypeScript", "Bootstrap"],
    type: "Financial services",
    link: "https://www.iconfilers.com/",
    // Captured 2026-11-17.
    image: iconfilersShot,
  },
  {
    title: "AK NextGen Solutions",
    description:
      "Corporate website presenting services, portfolio, and contact, with backend APIs for dynamic content.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    type: "Corporate",
    link: "https://aknextgensolutions.com/",
    // The live site doesn't render in headless capture; this is its own published share card.
    image: aknextgenCard,
    imageAlt: "AK NextGen Solutions logo",
  },
  {
    title: "Akkinetic Solutions",
    description: "Corporate website for a business-services company covering HR, finance, marketing, and support.",
    technologies: ["Angular", "TypeScript", "Tailwind CSS"],
    type: "Corporate",
    link: "https://akkinetic.com/",
    image: akkineticShot,
  },
  {
    title: "MimiVerse Media",
    description: "Website for an AI creative studio, presenting its services and portfolio with an editorial, animated layout.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    type: "Creative studio",
    link: "https://mimiverse.in/",
    image: mimiverseMediaShot,
  },
  {
    title: "Origins — The Event Zone",
    description:
      "Website for an event-decoration company in Hyderabad: services by occasion, a gallery, quote requests, and WhatsApp enquiries.",
    technologies: ["React", "Responsive design", "SEO"],
    type: "Local business",
    link: "https://originsevents.in/",
    image: originsShot,
  },
  {
    title: "QwikBag",
    description:
      "Marketing site for a white-label grocery and food delivery platform, presenting its customer, merchant, and rider apps.",
    technologies: ["React", "Tailwind CSS", "Node.js", "REST API"],
    type: "SaaS",
    link: "https://qwikbag.aknextgensolutions.com/",
    image: qwikbagShot,
  },
  {
    title: "MimiVerse Energy",
    description: "Website for a rooftop solar company: services, estimates, subsidy information, and enquiries.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    type: "Corporate",
    link: "https://mimiverseengery.aknextgensolutions.com/",
    image: mimiverseEnergyShot,
  },
  {
    title: "NextGen Visuals",
    description: "Portfolio site for a visual studio, built around bold typography, galleries, and service storytelling.",
    technologies: ["Angular", "TypeScript", "Tailwind CSS"],
    type: "Creative studio",
    link: "https://nextgenvisuals.aknextgensolutions.com/",
    image: nextgenVisualsShot,
  },
  {
    title: "DreamVolve",
    description: "Personal project: an AI image generator that turns text prompts into images.",
    technologies: ["React", "Node.js", "OpenAI API", "Tailwind CSS"],
    type: "Personal · AI",
    link: "https://dreamvolve.netlify.app/",
    image: dreamvolveShot,
  },
];
