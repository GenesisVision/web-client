import React from "react";
import { withTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import GlobalSearchResultConatiner from "./components/global-search-result/global-search-result-conatiner";

const GlobalSearchPage = ({ t }) => {
  const title = t("global-search-page.title");
  return (
    <Page title={title}>
      <GlobalSearchResultConatiner title={title} />
    </Page>
  );
};

export default withTranslation()(GlobalSearchPage);
