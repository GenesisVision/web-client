import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import FaqSection from "routes/ssr/landing-page/components/faq-section/faq-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const Faq: NextPage = () => {
  return (
    <Layout title="Genesis Vision FAQ">
      <main className="internal">
        <FaqSection />
      </main>
    </Layout>
  );
};
