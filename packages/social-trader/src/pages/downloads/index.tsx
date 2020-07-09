import { useTranslation } from "i18n";
import { NextPage } from "next";
import { getAccept } from "pages/landing-page/components/cookie-message/cookie-message.helpers";
import DownloadsSection from "pages/landing-page/components/downloads-section/downloads-section";
import {
  InternalContainer,
  InternalMainWrapper
} from "pages/landing-page/components/internal/internal.blocks";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

interface Props {
  cookieAccept?: string;
}

export const Downloads: NextPage<Props> = ({ cookieAccept }) => {
  const { t } = useTranslation();
  return (
    <Layout
      cookieAccept={cookieAccept}
      title={t("landing-page:page-titles.downloads")}
    >
      <InternalMainWrapper>
        <InternalContainer>
          <DownloadsSection />
        </InternalContainer>
      </InternalMainWrapper>
    </Layout>
  );
};

Downloads.getInitialProps = async ctx => {
  const cookieAccept = getAccept(ctx);
  return {
    cookieAccept,
    namespacesRequired: ["landing-page"]
  };
};
