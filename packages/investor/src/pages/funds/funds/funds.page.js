import Page from "shared/components/page/page";
import FundsTableContainer from "modules/funds-table/components/funds-table/funds-table-container";
import React from "react";
import { translate } from "react-i18next";

import FacetCardsContainer from "./components/facet-cards/faset-cards-container";
import FundsNavigationTabsContainer from "./components/funds-navigation-tabs/funds-navigation-tabs-container";

const FundsPage = ({ t }) => {
  const title = t("funds-page.title");
  return (
    <Page title={title}>
      <FundsNavigationTabsContainer />
      <FacetCardsContainer title={title} />
      <FundsTableContainer title={"All funds"} />
    </Page>
  );
};

export default translate()(FundsPage);
