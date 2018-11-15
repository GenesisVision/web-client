import Page from "shared/components/page/page";
import ProgramsContainer from "modules/programs-table/components/programs-table/programs-table-container";
import React from "react";
import { translate } from "react-i18next";

import FacetCardsContainer from "shared/components/facet-cards/faset-cards-container";
import ProgramsTabsContainer from "./components/programs-tabs/programs-tabs-container";

const ProgramsPage = ({ t }) => {
  const title = t("programs-page.title");
  return (
    <Page title={title}>
      <ProgramsTabsContainer />
      <FacetCardsContainer title={title} assetsFacets={"programsFacets"} />
      <ProgramsContainer title={"All programs"} />
    </Page>
  );
};

export default translate()(ProgramsPage);
