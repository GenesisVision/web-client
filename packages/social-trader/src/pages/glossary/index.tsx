import { useTranslation } from "i18n";
import { NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import GlossarySection from "pages/landing-page/components/glossary-section/glossary-section";
import {
  InternalContainer,
  InternalMainWrapper
} from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

interface Props {
  cookieAccept?: string;
}

export const Glossary: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.glossary")}
    >
      <InternalMainWrapper>
        <InternalContainer>
          <GlossarySection />
        </InternalContainer>
      </InternalMainWrapper>
    </Layout>
  );
};

Glossary.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["landing-page"]
  };
};
