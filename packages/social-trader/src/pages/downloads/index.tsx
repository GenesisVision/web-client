import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { useTranslation } from "i18n";
import { NextPage } from "next";
import DownloadsSection from "pages/landing-page/components/downloads-section/downloads-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Downloads: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page.page-titles.downloads")}>
      <main className="internal">
        <div className="internal__container">
          <DownloadsSection />
        </div>
      </main>
    </Layout>
  );
};
