import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import FacetContainer, {
  FACET_ASSET
} from "shared/components/facet-container/facet-container";
import { getCurrentFacet } from "shared/components/funds/funds-facet/services/funds-facet.service";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import { fetchFunds } from "shared/modules/funds-table/services/funds-table.service";

import FundsFacetTable from "./components/funds-facet-table";

class _FundsFacetPage extends React.PureComponent<Props> {
  fetchFunds = (filters: ComposeFiltersAllType): Promise<IDataModel> => {
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
            asset={FACET_ASSET.FUNDS}
            TableContainer={FundsFacetTable}
            getCurrentFacet={getCurrentFacet}
            getItems={this.fetchFunds}
          />
        </Surface>
      </Page>
    );
  }
}

interface Props extends InjectedTranslateProps {}

const FundsFacetPage = translate()(_FundsFacetPage);
export default FundsFacetPage;
