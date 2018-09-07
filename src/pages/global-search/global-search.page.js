import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";

import GlobalSearchInputContainer from "./components/global-search-input/global-search-input-container";
import GlobalSearchNavigation from "./components/global-search-navigation";
import GlobalSearchResult from "./components/global-search-result/global-search-result";

const GlobalSearchPage = ({ t }) => (
  <Page title={t("global-search-page.title")}>
    <GlobalSearchNavigation />
    <GlobalSearchInputContainer />
    <GlobalSearchResult />
  </Page>
);
export default translate()(GlobalSearchPage);
