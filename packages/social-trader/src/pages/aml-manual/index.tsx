import { useTranslation } from "i18n";
import { NextPage } from "next";
import AmlManualSection from "pages/landing-page/components/aml-manual-section/aml-manual-section";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import {
  InternalContainer,
  InternalMainWrapper
} from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

interface Props {
  cookieAccept?: string;
}

export const AmlManual: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.aml-manual")}
    >
      <InternalMainWrapper>
        <InternalContainer>
          <AmlManualSection />
        </InternalContainer>
      </InternalMainWrapper>
    </Layout>
  );
};

AmlManual.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["landing-page"]
  };
};
