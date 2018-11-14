import Page from "shared/components/page/page";
import React from "react";
import { translate } from "react-i18next";

import ProgramsFacetContainer from "shared/components/programs/programs-facet/programs-facet-container";
import ProgramsContainer from "modules/programs-table/components/programs-table/programs-table-container";
import { getPrograms } from "modules/programs-table/services/programs-table.service";
import { getCurrentFacet } from "./services/programs-facet.service";

const ProgramsFacetPage = ({ t }) => (
  <Page title={t("programs-page.title")}>
    <ProgramsFacetContainer
      ProgramsContainer={ProgramsContainer}
      getPrograms={getPrograms}
      getCurrentFacet={getCurrentFacet}
    />
  </Page>
);
export default translate()(ProgramsFacetPage);
