import "routes/ssr/landing-page/styles/index.scss";
import "routes/ssr/landing-page/styles/internal.scss";

import { NextPage } from "next";
import React from "react";
import ReferralProgramSection from "routes/ssr/landing-page/components/referral-program-section/referral-program-section";
import Layout from "routes/ssr/landing-page/layouts/_layout";

export const LPReferralProgram: NextPage = () => {
  return (
    <Layout title="Genesis Vision Referral Program">
      <main className="internal">
        <ReferralProgramSection />
      </main>
    </Layout>
  );
};
