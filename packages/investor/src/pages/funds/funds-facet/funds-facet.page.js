import Page from "shared/components/page/page";
import React from "react";
import { translate } from "react-i18next";

import FundsFacetContainer from "shared/components/funds/funds-facet/funds-facet-container";
import FundsTableContainer from "modules/funds-table/components/funds-table/funds-table-container";
import { getPrograms } from "modules/programs-table/services/programs-table.service";
import { getCurrentFacet } from "./services/funds-facet.service";

const FundsFacetPage = ({ t }) => (
  <Page title={t("funds-page.title")}>
    <FundsFacetContainer
      getPrograms={getPrograms}
      getCurrentFacet={getCurrentFacet}
      FundsTableContainer={FundsTableContainer}
    />
  </Page>
);
export default translate()(FundsFacetPage);
