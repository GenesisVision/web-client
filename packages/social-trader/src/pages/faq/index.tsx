import { useTranslation } from "i18n";
import { NextPage } from "next";
import { Downloads } from "pages/downloads";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import FaqSection from "pages/landing-page/components/faq-section/faq-section";
import { InternalMainWrapper } from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";
import { FAQ_SCHEMA } from "utils/seo";

interface Props {
  cookieAccept?: string;
}

export const Faq: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.faq")}
      schemas={[FAQ_SCHEMA]}
    >
      <InternalMainWrapper>
        <FaqSection />
      </InternalMainWrapper>
    </Layout>
  );
};

Faq.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["auth", "landing-page"]
  };
};
