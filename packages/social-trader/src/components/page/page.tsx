import BackButton from "components/back-button/back-button";
import useRole from "hooks/use-role.hook";
import Head from "next/head";
import * as React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Thing, WithContext } from "schema-dts";

const _Page = <T extends Thing>({
  title,
  children,
  schema
}: PropsWithChildren<Props<T>>) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <>
      <Head>
        <title>{t(`${role ? `${role}.` : ""}app.title`) + title}</title>
        {schema ? (
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            key="json-ld"
            type="application/ld+json"
          />
        ) : null}
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
}

const Page = _Page;
export default Page;
