import { useTranslation } from "i18n";
import { NextPage } from "next";
import FeesSection from "pages/landing-page/components/fees-section/fees-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Fees: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.fees")}>
      <main className="internal">
        <FeesSection />
      </main>
    </Layout>
  );
};

Fees.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
