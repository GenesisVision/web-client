import Page from "shared/components/page/page";
import React from "react";
import { translate } from "react-i18next";

import FundsFacetContainer from "./components/funds-facet/funds-facet-container";

const FundsFacetPage = ({ t }) => (
  <Page title={t("funds-page.title")}>
    <FundsFacetContainer />
  </Page>
);
export default translate()(FundsFacetPage);
