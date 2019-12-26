import * as React from "react";

import filesService from "../services/file-service";

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
      <meta
        key="og-description"
        property="og:description"
        content={description}
      />
      <meta
        key="twitter-description"
        name="twitter:description"
        content={description}
      />
    </>
  ) : null;
};

export const imageMeta = (image?: string) => {
  return image ? (
    <>
      <meta
        property="og:image"
        key="og-image"
        content={filesService.getFileUrl(image)}
      />

      <meta
        name="twitter:image:src"
        key="twitter:image:src"
        content={filesService.getFileUrl(image)}
      />
    </>
  ) : null;
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Genesis Vision",
  logo: "",
  sameAs: [
    "https://twitter.com/genesis_vision/",
    "https://www.facebook.com/GenesisVisionProject/"
  ]
};

export type SchemaType = { [key: string]: string | string[] | number };
