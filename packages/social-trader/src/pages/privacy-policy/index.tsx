import { useTranslation } from "i18n";
import { NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import {
  InternalContainer,
  InternalMainWrapper
} from "pages/landing-page/components/internal/internal.blocks";
import PrivacyPolicySection from "pages/landing-page/components/privacy-policy-section/privacy-policy-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

interface Props {
  cookieAccept?: string;
}

export const PrivacyPolicy: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.privacy-policy")}
    >
      <InternalMainWrapper isSmallFont>
        <InternalContainer>
          <PrivacyPolicySection />
        </InternalContainer>
      </InternalMainWrapper>
    </Layout>
  );
};

PrivacyPolicy.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["landing-page"]
  };
};
