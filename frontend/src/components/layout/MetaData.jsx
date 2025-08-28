import React from "react";
import { Helmet } from "react-helmet";

// Enhanced SEO component. Backward compatible with title-only usage.
const BASE_URL = "https://www.toolzite.com";

const MetaData = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  robots = "index, follow",
  url,
  siteName = "ToolZite",
  keywords,
  structuredData, // object or array of JSON-LD objects
}) => {
  const fullTitle = title ? `${title} - toolZite` : "ToolZite";

  // Compute absolute URL if not provided
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : undefined);
  const absoluteUrl = currentUrl || BASE_URL;
  const canonicalUrl = canonical || absoluteUrl;

  const ogImage = image || `${BASE_URL}/images/og-default.jpg`;

  const jsonLdArray = Array.isArray(structuredData)
    ? structuredData
    : structuredData
    ? [structuredData]
    : [];

  return (
    <Helmet>
      {/* Title */}
      {fullTitle && <title>{fullTitle}</title>}

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Meta basics */}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {robots && <meta name="robots" content={robots} />}

      {/* Open Graph */}
      {fullTitle && <meta property="og:title" content={fullTitle} />}
      {description && (
        <meta property="og:description" content={description} />
      )}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      {absoluteUrl && <meta property="og:url" content={absoluteUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {fullTitle && <meta name="twitter:title" content={fullTitle} />}
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      {ogImage && <meta name="twitter:image" content={ogImage} />} 

      {/* JSON-LD */}
      {jsonLdArray.map((obj, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
};

export default MetaData;
