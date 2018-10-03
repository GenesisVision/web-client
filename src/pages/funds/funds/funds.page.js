import Page from "components/page/page";
import ProgramsContainer from "modules/programs-table/components/programs-table/programs-table-container";
import React from "react";
import { translate } from "react-i18next";

// import FacetCardsContainer from "./components/facet-cards/faset-cards-container";
// import ProgramsTabsContainer from "./components/programs-tabs/programs-tabs-container";

const FundsPage = ({ t }) => {
  return (
    <Page title={t("funds-page.title")}>
      {/* <ProgramsTabsContainer />
      <FacetCardsContainer /> */}
      <ProgramsContainer />
    </Page>
  );
};

export default translate()(FundsPage);
