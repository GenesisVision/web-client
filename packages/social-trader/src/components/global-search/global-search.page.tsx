import GlobalSearchContainer from "components/global-search/components/global-search-result/global-search-container";
import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

const GlobalSearchPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("global-search-page.title");
  return (
    <Page title={title}>
      <GlobalSearchContainer />
    </Page>
  );
};
export default GlobalSearchPage;
