import BackButton from "components/back-button/back-button";
import useRole from "hooks/use-role.hook";
import Head from "next/head";
import * as React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Thing, WithContext } from "schema-dts";
import filesService from "services/file-service";

const Schema = (schema?: any) => {
  return schema ? (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      key="json-ld"
      type="application/ld+json"
    />
  ) : null;
};

const TitleMeta = (title?: string) => {
  return title ? (
    <>
      <meta key="og-title" property="og:title" content={title} />
      <meta key="twitter-title" name="twitter:title" content={title} />
    </>
  ) : null;
};

const DescriptionMeta = (description?: string) => {
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

const PreviewImage = (image?: string) => {
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

const _Page = <T extends Thing>({
  title,
  description,
  children,
  schema,
  previewImage
}: PropsWithChildren<Props<T>>) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <>
      <Head>
        <title>{t(`${role ? `${role}.` : ""}app.title`) + title}</title>
        {Schema(schema)}
        {TitleMeta(title)}
        {DescriptionMeta(description)}
        {PreviewImage(previewImage)}
      </Head>
      <div>
        <BackButton />
      </div>
      {children}
    </>
  );
};

interface Props<T extends Thing> {
  title: string;
  schema?: WithContext<T>;
  description?: string;
  previewImage?: string;
}

const Page = _Page;
export default Page;
