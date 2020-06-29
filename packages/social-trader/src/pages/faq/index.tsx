import { useTranslation } from "i18n";
import { NextPage } from "next";
import FaqSection from "pages/landing-page/components/faq-section/faq-section";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Faq: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.faq")}>
      <InternalMainWrapper>
        <FaqSection />
      </InternalMainWrapper>
    </Layout>
  );
};

Faq.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
