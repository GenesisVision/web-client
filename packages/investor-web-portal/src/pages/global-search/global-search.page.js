import Page from "shared/components/page/page";
import React from "react";
import { translate } from "react-i18next";

import GlobalSearchResultConatiner from "./components/global-search-result/global-search-result-conatiner";

const GlobalSearchPage = ({ t }) => {
  const title = t("global-search-page.title");
  return (
    <Page title={title}>
      <GlobalSearchResultConatiner title={title} />
    </Page>
  );
};

export default translate()(GlobalSearchPage);
