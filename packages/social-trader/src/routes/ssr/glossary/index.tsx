import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import GlossarySection from "routes/ssr/landing-page/components/glossary-section/glossary-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const Glossary: NextPage = () => {
  return (
    <Layout title="Genesis Vision Glossary">
      <main className="internal">
        <div className="internal__container">
          <GlossarySection />
        </div>
      </main>
    </Layout>
  );
};
