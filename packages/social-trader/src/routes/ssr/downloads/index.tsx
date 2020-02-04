import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import DownloadsSection from "routes/ssr/landing-page/components/downloads-section/downloads-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const Downloads: NextPage = () => {
  return (
    <Layout title="Genesis Vision Downloads">
      <main className="internal">
        <div className="internal__container">
          <DownloadsSection />
        </div>
      </main>
    </Layout>
  );
};
