import Page from "components/page/page";
import FundsTableContainer from "modules/funds-table/components/funds-table/funds-table-container";
import React from "react";
import { translate } from "react-i18next";

import FacetCardsContainer from "./components/facet-cards/faset-cards-container";
import FundsNavigationTabsContainer from "./components/funds-navigation-tabs/funds-navigation-tabs-container";

const FundsPage = ({ t }) => {
  return (
    <Page title={t("funds-page.title")}>
      <FacetCardsContainer />
      <FundsTableContainer title={"All funds"} />
    </Page>
  );
};

export default translate()(FundsPage);
