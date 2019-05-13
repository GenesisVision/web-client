import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import FacetContainer, {
  FACET_ASSET
} from "shared/components/facet-container/facet-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";

import ProgramsFacetTable from "./components/programs-facet-table";
import { getCurrentFacet } from "./services/programs-facet.service";

class _ProgramsFacetPage extends React.PureComponent<InjectedTranslateProps> {
  fetchPrograms = (filters: ComposeFiltersAllType): Promise<IDataModel> => {
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
            asset={FACET_ASSET.PROGRAMS}
            TableContainer={ProgramsFacetTable}
            getCurrentFacet={getCurrentFacet}
            getItems={this.fetchPrograms}
          />
        </Surface>
      </Page>
    );
  }
}

const ProgramsFacetPage = translate()(_ProgramsFacetPage);
export default ProgramsFacetPage;
