import { useTranslation } from "i18n";
import { NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import FeesSection from "pages/landing-page/components/fees-section/fees-section";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

interface Props {
  cookieAccept?: string;
}

export const Fees: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.fees")}
    >
      <InternalMainWrapper>
        <FeesSection />
      </InternalMainWrapper>
    </Layout>
  );
};

Fees.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["landing-page"]
  };
};
