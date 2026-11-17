import { Head } from "vite-react-ssg";
import { absoluteUrl, site } from "@/lib/site";

interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/blog/my-post". Becomes the canonical + og:url. */
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  /** Extra JSON-LD emitted alongside the page meta. */
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-route document head. Emitted into the prerendered HTML at build time, so
 * crawlers and link-preview bots see the right tags without running JS.
 */
export const Seo = ({
  title,
  description,
  path,
  image = site.defaultImage,
  type = "website",
  schema,
}: SeoProps) => {
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const blocks = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={site.shortName} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  );
};
