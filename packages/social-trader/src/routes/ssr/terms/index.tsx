import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import TermsSection from "routes/ssr/landing-page/components/terms-section/terms-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const Terms: NextPage = () => {
  return (
    <Layout title="Genesis Vision Terms and conditions">
      <main className="internal">
        <div className="internal__container">
          <TermsSection />
        </div>
      </main>
    </Layout>
  );
};
