import Page from "components/page/page";
import { PostItemsViewModel, SocialSummary } from "gv-api-web";
import { SocialPageContainer } from "pages/social/social/social-page.container";
import { SocialPageContextProvider } from "pages/social/social/social-page.context";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  cookieShowEvents?: boolean;
  initFeedData?: PostItemsViewModel;
  data: SocialSummary;
}

export const SocialPage: React.FC<Props> = ({
  cookieShowEvents,
  data,
  initFeedData
}) => {
  const [t] = useTranslation();
  return (
    <Page title={t("Social")}>
      <SocialPageContextProvider cookieShowEvents={cookieShowEvents}>
        <SocialPageContainer initFeedData={initFeedData} data={data} />
      </SocialPageContextProvider>
    </Page>
  );
};
