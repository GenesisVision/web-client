import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";

import GlobalSearchNavigation from "./components/global-search-navigation";
import GlobalSearchResultConatiner from "./components/global-search-result/global-search-result-conatiner";

const GlobalSearchPage = ({ t }) => (
  <Page title={t("global-search-page.title")}>
    <GlobalSearchNavigation />
    <GlobalSearchResultConatiner />
  </Page>
);
export default translate()(GlobalSearchPage);
