import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  commonMeta,
  descriptionMeta,
  imageMeta,
  schema,
  SchemaType,
  titleMeta,
  urlMeta
} from "utils/seo";

export const PageSeoWrapper: React.FC<IPageSeoWrapperProps> = ({
  type,
  children,
  url,
  schemas,
  title,
  description,
  previewImage,
  noFollow,
  noIndex
}) => {
  const [t] = useTranslation();
  const pageTitle = `${title} | ${t("app.title")}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {commonMeta(type)}
        {urlMeta(url)}
        {schema(schemas)}
        {titleMeta(title)}
        {descriptionMeta(description)}
        {imageMeta(previewImage)}
        {noFollow && <meta name="robots" content="nofollow" />}
        {noIndex && <meta name="robots" content="noindex" />}
      </Head>
      {children}
    </>
  );
};

export interface IPageSeoWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: "website" | "article";
  showTitle?: boolean;
  title: string;
  schemas?: Array<SchemaType>;
  description?: string;
  previewImage?: string;
  url?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}
