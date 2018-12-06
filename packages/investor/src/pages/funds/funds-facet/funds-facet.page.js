import React from "react";
import { translate } from "react-i18next";
import FacetContainer from "shared/components/facet-container/facet-container";
import { getCurrentFacet } from "shared/components/funds/funds-facet/services/funds-facet.service";
import Page from "shared/components/page/page";
import FundsTableContainer from "shared/modules/funds-table/components/funds-table/funds-table-container";

const FundsFacetPage = ({ t }) => (
  <Page title={t("funds-page.title")}>
    <FacetContainer
      asset={"fundsFacets"}
      TableContainer={FundsTableContainer}
      getCurrentFacet={getCurrentFacet}
    />
  </Page>
);
export default translate()(FundsFacetPage);
