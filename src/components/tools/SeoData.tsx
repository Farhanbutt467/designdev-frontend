"use client";

import siteConfig from "@/config/siteConfig.json";
import { usePathname } from "next/navigation";

const SeoData = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
  seo_meta,
}: {
  title?: string;
  meta_title?: string;
  image?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  seo_meta?: any;
}) => {
  const { meta_image, meta_author, meta_description } = siteConfig.metadata;
  const { base_url } = siteConfig.site_info;
  const pathname = usePathname();

  // Helper to get image URL
  const getImageUrlLocal = (path: string | null | undefined) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("data:")) return path;
    if (path.startsWith("/assets")) return path;
    const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
    const serverUrl = envBaseUrl.replace("/api", "").replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${serverUrl}${cleanPath}`;
  };

  // SEO Fallbacks
  const finalTitle = seo_meta?.title || meta_title || title || siteConfig.site_info.title;
  const finalDescription = seo_meta?.description || description || meta_description;
  const finalKeywords = seo_meta?.keywords || "";
  const finalAuthor = seo_meta?.author || meta_author;
  const finalRobots = noindex ? "noindex,nofollow" : (seo_meta?.robots || "index, follow");
  const finalCanonical = seo_meta?.canonical || canonical || `${base_url}${pathname}`;

  // OG & Twitter specific fallbacks
  const ogTitle = seo_meta?.og_title || finalTitle;
  const ogDescription = seo_meta?.og_description || finalDescription;
  const ogImage = seo_meta?.og_image ? getImageUrlLocal(seo_meta.og_image) : (image ? getImageUrlLocal(image) : `${base_url}${meta_image}`);
  
  const twitterTitle = seo_meta?.twitter_title || ogTitle;
  const twitterDescription = seo_meta?.twitter_description || ogDescription;
  const twitterImage = seo_meta?.twitter_image ? getImageUrlLocal(seo_meta.twitter_image) : ogImage;
  const twitterCard = seo_meta?.twitter_card || "summary_large_image";

  return (
    <>
      <title>{finalTitle}</title>
      <link rel="canonical" href={finalCanonical} itemProp="url" />
      <meta name="robots" content={finalRobots} />
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <meta name="author" content={finalAuthor} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={seo_meta?.og_type || "website"} />
      <meta property="og:url" content={seo_meta?.og_url || `${base_url}${pathname}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={seo_meta?.og_site_name || siteConfig.site_info.title} />
      <meta property="og:locale" content={seo_meta?.og_locale || "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Advanced & Mobile */}
      {seo_meta?.theme_color && <meta name="theme-color" content={seo_meta.theme_color} />}
      {seo_meta?.apple_mobile_web_app_capable && <meta name="apple-mobile-web-app-capable" content={seo_meta.apple_mobile_web_app_capable} />}
      {seo_meta?.rating && <meta name="rating" content={seo_meta.rating} />}
      
      {/* Geo Tags */}
      {seo_meta?.geo_region && <meta name="geo.region" content={seo_meta.geo_region} />}
      {seo_meta?.geo_placename && <meta name="geo.placename" content={seo_meta.geo_placename} />}
      {seo_meta?.geo_position && <meta name="geo.position" content={seo_meta.geo_position} />}
      {seo_meta?.icbm && <meta name="ICBM" content={seo_meta.icbm} />}
    </>
  );
};

export default SeoData;
