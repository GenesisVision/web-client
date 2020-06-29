import { useTranslation } from "i18n";
import { NextPage } from "next";
import GlossarySection from "pages/landing-page/components/glossary-section/glossary-section";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Glossary: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.glossary")}>
      <InternalMainWrapper>
        <div className="internal__container">
          <GlossarySection />
        </div>
      </InternalMainWrapper>
    </Layout>
  );
};

Glossary.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
