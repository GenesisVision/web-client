import Page from "shared/components/page/page";
import React from "react";
import { translate } from "react-i18next";

import FacetContainer from "shared/components/facet-container/facet-container";
import ProgramsContainer from "modules/programs-table/components/programs-table/programs-table-container";
import { getCurrentFacet } from "./services/programs-facet.service";

const ProgramsFacetPage = ({ t }) => (
  <Page title={t("programs-page.title")}>
    <FacetContainer
      asset={"programsFacets"}
      TableContainer={ProgramsContainer}
      getCurrentFacet={getCurrentFacet}
    />
  </Page>
);
export default translate()(ProgramsFacetPage);
