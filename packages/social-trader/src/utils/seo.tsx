import * as React from "react";
import { Organization, Table, Thing, WithContext } from "schema-dts";
import filesService from "services/file-service";

export const schema = (() => {
  let index = 0;

  return <T extends Thing>(schema?: WithContext<T>) => {
    return schema ? (
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key={`json-ld-${index++}`}
        type="application/ld+json"
      />
    ) : null;
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

export const getOrganizationSchema = (): WithContext<Organization> => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Genesis Vision",
    logo: "",
    sameAs: [
      "https://twitter.com/genesis_vision/",
      "https://www.facebook.com/GenesisVisionProject/"
    ]
  };
};

export const getProgramTable = (): WithContext<Table> => {
  return {
    "@context": "https://schema.org",
    "@type": "Table",
    about: "List of programs"
  };
};

export const getFundsTable = (): WithContext<Table> => {
  return {
    "@context": "https://schema.org",
    "@type": "Table",
    about: "List of funds"
  };
};
