import { useEffect } from "react";
import {
  buildCanonicalUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_TITLE,
  SITE_NAME,
} from "../../../lib/seo-config";
import {
  clearStructuredData,
  upsertCanonical,
  upsertMeta,
  upsertStructuredData,
} from "../../../lib/headManager";

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
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
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
  publishedTime,
  modifiedTime,
  author,
  structuredData,
}: SeoProps) {
  useEffect(() => {
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

    document.title = title;

    upsertMeta({ key: "name", value: "description" }, description);
    upsertMeta({ key: "name", value: "robots" }, robotsContent);
    upsertCanonical(canonicalUrl);

    upsertMeta({ key: "property", value: "og:title" }, openGraphTitle);
    upsertMeta({ key: "property", value: "og:description" }, openGraphDescription);
    upsertMeta({ key: "property", value: "og:type" }, type);
    upsertMeta({ key: "property", value: "og:url" }, canonicalUrl);
    upsertMeta({ key: "property", value: "og:image" }, image);
    upsertMeta({ key: "property", value: "og:site_name" }, SITE_NAME);

    upsertMeta({ key: "name", value: "twitter:card" }, "summary_large_image");
    upsertMeta({ key: "name", value: "twitter:title" }, twitterMetaTitle);
    upsertMeta({ key: "name", value: "twitter:description" }, twitterMetaDescription);
    upsertMeta({ key: "name", value: "twitter:image" }, image);

    if (type === "article") {
      if (publishedTime) {
        upsertMeta({ key: "property", value: "article:published_time" }, publishedTime);
      }
      if (modifiedTime) {
        upsertMeta({ key: "property", value: "article:modified_time" }, modifiedTime);
      }
      if (author) {
        upsertMeta({ key: "property", value: "article:author" }, author);
      }
    }

    upsertStructuredData("route", structuredDataList);

    return () => {
      clearStructuredData("route");
    };
  }, [
    canonicalPath,
    author,
    description,
    image,
    modifiedTime,
    noIndex,
    ogDescription,
    ogTitle,
    path,
    publishedTime,
    robots,
    structuredData,
    title,
    twitterDescription,
    twitterTitle,
    type,
  ]);

  return null;
}
