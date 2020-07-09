import { useTranslation } from "i18n";
import { NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import {
  InternalContainer,
  InternalMainWrapper
} from "pages/landing-page/components/internal/internal.blocks";
import TermsSection from "pages/landing-page/components/terms-section/terms-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

interface Props {
  cookieAccept?: string;
}

export const Terms: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.terms")}
    >
      <InternalMainWrapper isSmallFont>
        <InternalContainer>
          <TermsSection />
        </InternalContainer>
      </InternalMainWrapper>
    </Layout>
  );
};

Terms.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["landing-page"]
  };
};
