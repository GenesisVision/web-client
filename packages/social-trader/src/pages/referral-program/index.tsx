import { useTranslation } from "i18n";
import { NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import ReferralProgramSection from "pages/landing-page/components/referral-program-section/referral-program-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

interface Props {
  cookieAccept?: string;
}

export const LPReferralProgram: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.referral-program")}
    >
      <InternalMainWrapper>
        <ReferralProgramSection />
      </InternalMainWrapper>
    </Layout>
  );
};

LPReferralProgram.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["auth", "referral-program", "landing-page"]
  };
};
