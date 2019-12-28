import BackButton from "components/back-button/back-button";
import { TitleContext } from "components/link/link.helper";
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

const _Page = ({
  title,
  description,
  children,
  schemas,
  previewImage,
  url
}: PropsWithChildren<Props>) => {
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
        {children}
      </>
    </TitleContext.Provider>
  );
};

interface Props {
  title: string;
  schemas?: Array<SchemaType>;
  description?: string;
  previewImage?: string;
  url?: string;
}

const Page = React.memo(_Page);
export default Page;
