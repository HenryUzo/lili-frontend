import { Helmet } from "react-helmet-async";
import {
  buildCanonicalUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_TITLE,
  SITE_NAME,
} from "../../../lib/seo-config";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  canonicalPath,
  image = DEFAULT_OG_IMAGE_URL,
  type = "website",
  noIndex = false,
  robots,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  structuredData,
}: SeoProps) {
  const canonicalUrl = buildCanonicalUrl(canonicalPath ?? path);
  const robotsContent = robots ?? (noIndex ? "noindex,follow" : "index,follow");
  const openGraphTitle = ogTitle ?? title;
  const openGraphDescription = ogDescription ?? description;
  const twitterMetaTitle = twitterTitle ?? openGraphTitle;
  const twitterMetaDescription = twitterDescription ?? openGraphDescription;
  const structuredDataList = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  if (typeof document !== "undefined" && document.title !== title) {
    document.title = title;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={openGraphTitle} />
      <meta property="og:description" content={openGraphDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterMetaTitle} />
      <meta name="twitter:description" content={twitterMetaDescription} />
      <meta name="twitter:image" content={image} />

      {structuredDataList.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
