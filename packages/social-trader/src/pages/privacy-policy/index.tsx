import { useTranslation } from "i18n";
import { NextPage } from "next";
import {
  InternalContainer,
  InternalMainWrapper
} from "pages/landing-page/components/internal/internal.blocks";
import PrivacyPolicySection from "pages/landing-page/components/privacy-policy-section/privacy-policy-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.privacy-policy")}>
      <InternalMainWrapper isSmallFont>
        <InternalContainer>
          <PrivacyPolicySection />
        </InternalContainer>
      </InternalMainWrapper>
    </Layout>
  );
};

PrivacyPolicy.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
