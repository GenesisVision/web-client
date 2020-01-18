import BackButton from "components/back-button/back-button";
import { TitleContext } from "components/link/link.helper";
import { useRefLink } from "hooks/ref-link";
import Head from "next/head";
import * as React from "react";
import { PropsWithChildren } from "react";
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

const Page = ({
  showTitle,
  title,
  description,
  children,
  schemas,
  previewImage,
  url
}: PropsWithChildren<Props>) => {
  useRefLink();
  const [t] = useTranslation();
  const pageTitle = t("app.title") + title;
  return (
    <TitleContext.Provider value={title}>
      <>
        <Head>
          <title>{pageTitle}</title>
          {commonMeta()}
          {urlMeta(url)}
          {schema(schemas)}
          {titleMeta(title)}
          {descriptionMeta(description)}
          {imageMeta(previewImage)}
        </Head>
        <div>
          <BackButton />
        </div>
        {showTitle && (
          <div className="page__title">
            <h1>{title}</h1>
          </div>
        )}
        {children}
      </>
    </TitleContext.Provider>
  );
};

interface Props {
  showTitle?: boolean;
  title: string;
  schemas?: Array<SchemaType>;
  description?: string;
  previewImage?: string;
  url?: string;
}

export default Page;
