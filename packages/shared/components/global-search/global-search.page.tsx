import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Page from "shared/components/page/page";

import GlobalSearchResultContainer from "./components/global-search-result/global-search-result-container";

const GlobalSearchPage: React.FC<WithTranslation> = ({ t }) => {
  const title = t("global-search-page.title");
  return (
    <Page title={title}>
      <GlobalSearchResultContainer title={title} />
    </Page>
  );
};

export default translate()(GlobalSearchPage);
