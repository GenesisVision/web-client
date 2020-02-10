import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { NextPage } from "next";
import GlossarySection from "pages/landing-page/components/glossary-section/glossary-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

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
