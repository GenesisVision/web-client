import BackButton from "components/back-button/back-button";
import { TitleContext } from "components/link/link.helper";
import Head from "next/head";
import * as React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Thing, WithContext } from "schema-dts";
import { descriptionMeta, imageMeta, schema, titleMeta } from "utils/seo";

const _Page = ({
  title,
  description,
  children,
  schemas,
  previewImage
}: PropsWithChildren<Props>) => {
  const [t] = useTranslation();
  const pageTitle = t("app.title") + title;
  return (
    <TitleContext.Provider value={title}>
      <>
        <Head>
          <title>{pageTitle}</title>
          {schema(schemas)}
          {titleMeta(pageTitle)}
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
  schemas?: WithContext<Thing>[];
  description?: string;
  previewImage?: string;
}

const Page = React.memo(_Page);
export default Page;
