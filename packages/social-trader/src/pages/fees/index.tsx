import { PlatformInfo } from "gv-api-web";
import { useTranslation } from "i18n";
import { NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import FeesSection from "pages/landing-page/components/fees-section/fees-section";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";
import { api } from "services/api-client/swagger-custom-client";

interface Props {
  cookieAccept?: string;
  platformInfo: PlatformInfo;
}

export const Fees: NextPage<Props> = ({ cookieAccept, platformInfo }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.fees")}
    >
      <InternalMainWrapper>
        <FeesSection
          platformWithdrawalInfo={
            platformInfo.commonInfo.platformWithdrawalInfo
          }
        />
      </InternalMainWrapper>
    </Layout>
  );
};

Fees.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  const platformInfo = await api.platform().getPlatformInfo();
  return {
    cookieAccept,
    namespacesRequired: ["fees", "landing-page"],
    platformInfo
  };
};
