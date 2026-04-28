"use client";

import siteConfig from "@/config/siteConfig.json";
import { usePathname } from "next/navigation";

const SeoData = ({
  title,
  meta_title,
  image,
  description,
  meta_description,
  canonical,
  meta_canonical,
  meta_open_graph,
  meta_twitter,
  noindex,
}: {
  title?: string;
  meta_title?: string;
  image?: string;
  description?: string;
  meta_description?: string;
  canonical?: string;
  meta_canonical?: string;
  meta_open_graph?: string;
  meta_twitter?: string;
  noindex?: boolean;
}) => {
  const { meta_image, meta_author, meta_description: meta_description_config } = siteConfig.metadata;
  const { base_url } = siteConfig.site_info;
  const pathname = usePathname();

  return (
    <>
      {/* title */}
      <title>
        {meta_title ? meta_title : title ? title : siteConfig.site_info.title}
      </title>

      {/* canonical url */}
      {(meta_canonical || canonical) && (
        <link
          rel="canonical"
          href={meta_canonical || canonical}
          itemProp="url"
        />
      )}

      {/* noindex robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta
        name="description"
        content={
          meta_description ? meta_description : description ? description : meta_description_config
        }
      />

      {/* author from config.json */}
      <meta name="author" content={meta_author} />

      {/* og-title */}
      <meta
        property="og:title"
        content={
          meta_title ? meta_title : title ? title : siteConfig.site_info.title
        }
      />

      {/* og-description */}
      <meta
        property="og:description"
        content={
          meta_open_graph
            ? meta_open_graph
            : meta_description
            ? meta_description
            : description
            ? description
            : meta_description_config
        }
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${base_url}/${pathname.replace("/", "")}`}
      />

      {/* twitter-title */}
      <meta
        name="twitter:title"
        content={
          meta_title ? meta_title : title ? title : siteConfig.site_info.title
        }
      />

      {/* twitter-description */}
      <meta
        name="twitter:description"
        content={
          meta_twitter
            ? meta_twitter
            : meta_description
            ? meta_description
            : description
            ? description
            : meta_description_config
        }
      />

      {/* og-image */}
      <meta
        property="og:image"
        content={`${base_url}${image ? image : meta_image}`}
      />

      {/* twitter-image */}
      <meta
        name="twitter:image"
        content={`${base_url}${image ? image : meta_image}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default SeoData;
