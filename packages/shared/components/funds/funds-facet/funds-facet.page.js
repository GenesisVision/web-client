import React, { Component } from "react";
import { translate } from "react-i18next";
import FacetContainer from "shared/components/facet-container/facet-container";
import { getCurrentFacet } from "shared/components/funds/funds-facet/services/funds-facet.service";
import Page from "shared/components/page/page";
import FundsTableContainer from "shared/modules/funds-table/components/funds-table/funds-table-container";

import { fetchFunds } from "../../../modules/funds-table/services/funds-table.service";

class FundsFacetPage extends Component {
  fetchFunds = filters => {
    return fetchFunds(filters).then(data => ({
      total: data.total,
      items: data.funds
    }));
  };
  render() {
    const { t } = this.props;
    return (
      <Page title={t("funds-page.title")}>
        <FacetContainer
          asset={"fundsFacets"}
          TableContainer={FundsTableContainer}
          getCurrentFacet={getCurrentFacet}
          getItems={fetchFunds}
        />
      </Page>
    );
  }
}
export default translate()(FundsFacetPage);
