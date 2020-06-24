import Page from "components/page/page";
import { SocialSummary } from "gv-api-web";
import { SocialPageContainer } from "pages/social/social/social-page.container";
import { SocialSearchContextProvider } from "pages/social/social/social-page.context";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: SocialSummary;
}

export const SocialPage: React.FC<Props> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("Social")}>
      <SocialSearchContextProvider>
        <SocialPageContainer data={data} />
      </SocialSearchContextProvider>
    </Page>
  );
};
