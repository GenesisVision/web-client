import * as React from "react";

export const schema = (() => {
  let index = 0;

  return (schema?: Array<SchemaType>) => {
    return schema
      ? schema.map(s => {
          return (
            <script
              dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
              key={`json-ld-${index}`}
              type="application/ld+json"
            />
          );
        })
      : null;
  };
})();

export const urlMeta = (url?: string) => {
  return url ? <meta key="og-url" property="og:url" content={url} /> : null;
};

export const titleMeta = (title?: string) => {
  return title ? (
    <>
      <meta key="og-title" property="og:title" content={title} />
      <meta key="twitter-title" name="twitter:title" content={title} />
    </>
  ) : null;
};

export const descriptionMeta = (description?: string) => {
  return description ? (
    <>
      <meta key="description" name="description" content={description} />
      <meta
        key="og-description"
        property="og:description"
        content={description}
      />
      <meta
        key="tw-description"
        name="twitter:description"
        content={description}
      />
    </>
  ) : null;
};

export const commonMeta = (type: "website" | "article" = "website") => {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta key={"og-type"} property="og:type" content={type} />
      <meta key={"og-sn"} property="og:site_name" content="Genesis Vision" />
      <meta key={"tw-site"} property="twitter:site" content="@genesis_vision" />
    </>
  );
};

export const imageMeta = (image?: string) => {
  return image ? (
    <>
      <meta property="og:image" key="og-image" content={image} />
      <meta name="twitter:image" key="twitter:image" content={image} />
    </>
  ) : null;
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Genesis Vision",
  url: "https://genesis.vision/",
  logo: "https://genesis.vision/icon.png",
  sameAs: [
    "https://t.me/genesisvision/",
    "https://github.com/GenesisVision/",
    "https://www.youtube.com/channel/UCnx2ja9luqWjgRt35tWR99w/",
    "https://www.reddit.com/r/genesisvision/",
    "https://www.linkedin.com/company/genesis-vision/",
    "https://blog.genesis.vision/",
    "https://twitter.com/genesis_vision/",
    "https://www.facebook.com/GenesisVisionProject/"
  ]
};

export type SchemaType = { [key: string]: string | string[] | number };
