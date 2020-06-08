import Page from "components/page/page";
import { SocialPageContainer } from "pages/social/social/social-page.container";
import { SocialSearchContextProvider } from "pages/social/social/social-page.context";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t("Social")}>
      <SocialSearchContextProvider>
        <SocialPageContainer />
      </SocialSearchContextProvider>
    </Page>
  );
};
