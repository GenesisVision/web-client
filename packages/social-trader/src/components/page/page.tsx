import BackButton from "components/back-button/back-button";
import useRole from "hooks/use-role.hook";
import Head from "next/head";
import * as React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

const _Page = ({ title, children }: PropsWithChildren<Props>) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <>
      <Head>
        <title>{t(`${role ? `${role}.` : ""}app.title`) + title}</title>
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
}

const Page = React.memo(_Page);
export default Page;
