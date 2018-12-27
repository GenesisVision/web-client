import React, { Component } from "react";
import { translate } from "react-i18next";
import FacetContainer from "shared/components/facet-container/facet-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";

import ProgramsFacetTable from "./components/programs-facet-table";
import { getCurrentFacet } from "./services/programs-facet.service";

class ProgramsFacetPage extends Component {
  fetchPrograms = filters => {
    return fetchPrograms(filters).then(data => ({
      total: data.total,
      items: data.programs
    }));
  };
  render() {
    const { t } = this.props;
    return (
      <Page title={t("programs-page.title")}>
        <Surface className="programs-table-container">
          <FacetContainer
            TableContainer={ProgramsFacetTable}
            getCurrentFacet={getCurrentFacet}
            getItems={this.fetchPrograms}
          />
        </Surface>
      </Page>
    );
  }
}
export default translate()(ProgramsFacetPage);
