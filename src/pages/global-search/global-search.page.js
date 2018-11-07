import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";

import GlobalSearchResultConatiner from "./components/global-search-result/global-search-result-conatiner";

const GlobalSearchPage = ({ t }) => (
  <Page title={t("global-search-page.title")}>
    <GlobalSearchResultConatiner />
  </Page>
);

export default translate()(GlobalSearchPage);
