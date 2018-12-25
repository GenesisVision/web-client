import React from "react";
import { translate } from "react-i18next";
import FacetContainer from "shared/components/facet-container/facet-container";
import Page from "shared/components/page/page";
import { getCurrentFacet } from "shared/components/programs/programs-facet/services/programs-facet.service";
import Surface from "shared/components/surface/surface";
import TableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

const ProgramsFacetPage = ({ t }) => (
  <Page title={t("programs-page.title")}>
    <Surface className="programs-table-container">
      <FacetContainer
        asset={"programsFacets"}
        TableContainer={TableModule}
        getCurrentFacet={getCurrentFacet}
      />
    </Surface>
  </Page>
);
export default translate()(ProgramsFacetPage);
