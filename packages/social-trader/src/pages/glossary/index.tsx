import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { useTranslation } from "i18n";
import { NextPage } from "next";
import GlossarySection from "pages/landing-page/components/glossary-section/glossary-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Glossary: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page.page-titles.glossary")}>
      <main className="internal">
        <div className="internal__container">
          <GlossarySection />
        </div>
      </main>
    </Layout>
  );
};
