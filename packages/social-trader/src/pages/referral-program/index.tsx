import { useTranslation } from "i18n";
import { NextPage } from "next";
import ReferralProgramSection from "pages/landing-page/components/referral-program-section/referral-program-section";
import Layout from "pages/landing-page/layouts/_layout";
import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";
import React from "react";

export const LPReferralProgram: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.referral-program")}>
      <main className="internal">
        <ReferralProgramSection />
      </main>
    </Layout>
  );
};

LPReferralProgram.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
