import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { personSchema, profilePageSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: `${site.name} – Portfolio`,
  alternateName: site.alternateNames,
  url: site.url,
  publisher: { "@id": `${site.url}/#person` },
};

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Seo
        title={`${site.name} | Freelance Full Stack Developer`}
        description="Freelance full stack developer working in React, Angular, Node.js and MySQL. I build web apps, SaaS dashboards, admin panels and the APIs behind them, and fix bugs and performance issues in existing codebases. Available for remote projects worldwide."
        path="/"
        type="profile"
        schema={[personSchema, profilePageSchema, websiteSchema, serviceSchema]}
      />
      {/* Subtle editorial canvas: faint grid + grain, no heavy color */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-paper-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply dark:mix-blend-soft-light dark:opacity-[0.04]" />
      </div>

      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Experience />
        <About />
        <Blog />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
