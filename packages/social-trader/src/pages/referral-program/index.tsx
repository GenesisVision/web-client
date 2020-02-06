import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { NextPage } from "next";
import ReferralProgramSection from "pages/landing-page/components/referral-program-section/referral-program-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const LPReferralProgram: NextPage = () => {
  return (
    <Layout title="Genesis Vision Referral Program">
      <main className="internal">
        <ReferralProgramSection />
      </main>
    </Layout>
  );
};
