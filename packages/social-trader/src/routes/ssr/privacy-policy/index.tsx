import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import PrivacyPolicySection from "routes/ssr/landing-page/components/privacy-policy-section/privacy-policy-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const PrivacyPolicy: NextPage = () => {
  return (
    <Layout title="Genesis Vision Privacy Policy">
      <main className="internal">
        <div className="internal__container">
          <PrivacyPolicySection />
        </div>
      </main>
    </Layout>
  );
};
