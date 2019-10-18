import React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import GlobalSearchResultContainer from "./components/global-search-result/global-search-result-container";

const GlobalSearchPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("global-search-page.title");
  return (
    <Page title={title}>
      <GlobalSearchResultContainer title={title} />
    </Page>
  );
};
export default GlobalSearchPage;
