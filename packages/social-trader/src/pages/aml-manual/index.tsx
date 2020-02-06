import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { NextPage } from "next";
import AmlManualSection from "pages/landing-page/components/aml-manual-section/aml-manual-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

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
