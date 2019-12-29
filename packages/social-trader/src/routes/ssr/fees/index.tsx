import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import FeesSection from "routes/ssr/landing-page/components/fees-section/fees-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const Fees: NextPage = () => {
  return (
    <Layout title="Genesis Vision Fees">
      <main className="internal">
        <FeesSection />
      </main>
    </Layout>
  );
};
