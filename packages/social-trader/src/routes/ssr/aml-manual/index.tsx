import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import AmlManualSection from "routes/ssr/landing-page/components/aml-manual-section/aml-manual-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const AmlManual: NextPage = () => {
  return (
    <Layout title="Genesis Vision Aml Manual">
      <main className="internal">
        <div className="internal__container">
          <AmlManualSection />
        </div>
      </main>
    </Layout>
  );
};
