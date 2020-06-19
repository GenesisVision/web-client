import { useTranslation } from "i18n";
import { NextPage } from "next";
import AmlManualSection from "pages/landing-page/components/aml-manual-section/aml-manual-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const AmlManual: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.aml-manual")}>
      <main className="internal">
        <div className="internal__container">
          <AmlManualSection />
        </div>
      </main>
    </Layout>
  );
};

AmlManual.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
