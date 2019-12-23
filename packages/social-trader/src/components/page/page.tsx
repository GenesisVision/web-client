import BackButton from "components/back-button/back-button";
import useRole from "hooks/use-role.hook";
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
  const role = useRole();
  const gvTitle = t(`${role ? `${role}.` : ""}app.title`) + title;
  return (
    <>
      <Head>
        <title>{gvTitle}</title>
        {schema(schemas)}
        {titleMeta(gvTitle)}
        {descriptionMeta(description)}
        {imageMeta(previewImage)}
      </Head>
      <div>
        <BackButton />
      </div>
      {children}
    </>
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
