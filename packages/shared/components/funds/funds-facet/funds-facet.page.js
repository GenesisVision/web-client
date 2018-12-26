import React, { Component } from "react";
import { translate } from "react-i18next";
import FacetContainer from "shared/components/facet-container/facet-container";
import { getCurrentFacet } from "shared/components/funds/funds-facet/services/funds-facet.service";
import Page from "shared/components/page/page";

import { fetchFunds } from "../../../modules/funds-table/services/funds-table.service";
import Surface from "../../surface/surface";
import FundsFacetTable from "./components/funds-facet-table";

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
        <Surface className="funds-table-container">
          <FacetContainer
            asset={"fundsFacets"}
            TableContainer={FundsFacetTable}
            getCurrentFacet={getCurrentFacet}
            getItems={this.fetchFunds}
          />
        </Surface>
      </Page>
    );
  }
}
export default translate()(FundsFacetPage);
