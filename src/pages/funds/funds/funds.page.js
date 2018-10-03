import Page from "components/page/page";
import ProgramsContainer from "modules/programs-table/components/programs-table/programs-table-container";
import React from "react";
import { translate } from "react-i18next";

import FacetCardsContainer from "./components/facet-cards/faset-cards-container";
import FundsNavigationTabsContainer from "./components/funds-navigation-tabs/funds-navigation-tabs-container";

const FundsPage = ({ t }) => {
  return (
    <Page title={t("funds-page.title")}>
      <FundsNavigationTabsContainer />
      <FacetCardsContainer />
      <ProgramsContainer />
    </Page>
  );
};

export default translate()(FundsPage);
