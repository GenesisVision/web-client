import { useTranslation } from "i18n";
import { NextPage } from "next";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import ReferralProgramSection from "pages/landing-page/components/referral-program-section/referral-program-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const LPReferralProgram: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.referral-program")}>
      <InternalMainWrapper>
        <ReferralProgramSection />
      </InternalMainWrapper>
    </Layout>
  );
};

LPReferralProgram.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
