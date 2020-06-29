import { useTranslation } from "i18n";
import { NextPage } from "next";
import AmlManualSection from "pages/landing-page/components/aml-manual-section/aml-manual-section";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const AmlManual: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.aml-manual")}>
      <InternalMainWrapper>
        <div className="internal__container">
          <AmlManualSection />
        </div>
      </InternalMainWrapper>
    </Layout>
  );
};

AmlManual.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
