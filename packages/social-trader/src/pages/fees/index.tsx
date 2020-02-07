import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { NextPage } from "next";
import FeesSection from "pages/landing-page/components/fees-section/fees-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Fees: NextPage = () => {
  return (
    <Layout title="Genesis Vision Fees">
      <main className="internal">
        <FeesSection />
      </main>
    </Layout>
  );
};
