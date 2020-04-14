import { useTranslation } from "i18n";
import { NextPage } from "next";
import FaqSection from "pages/landing-page/components/faq-section/faq-section";
import Layout from "pages/landing-page/layouts/_layout";
import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";
import React from "react";

export const Faq: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.faq")}>
      <main className="internal">
        <FaqSection />
      </main>
    </Layout>
  );
};

Faq.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
