import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { NextPage } from "next";
import PrivacyPolicySection from "pages/landing-page/components/privacy-policy-section/privacy-policy-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

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
