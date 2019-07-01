import React, { useCallback } from "react";
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

const _FundsFacetPage: React.FC<Props> = ({ t }) => {
  const getFunds = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchFunds(filters).then(data => ({
        total: data.total,
        items: data.funds
      })),
    []
  );
  return (
    <Page title={t("funds-page.title")}>
      <Surface className="funds-table-container">
        <FacetContainer
          asset={FACET_ASSET.FUNDS}
          TableContainer={FundsFacetTable}
          getCurrentFacet={getCurrentFacet}
          getItems={getFunds}
        />
      </Surface>
    </Page>
  );
};

interface Props extends InjectedTranslateProps {}

const FundsFacetPage = translate()(React.memo(_FundsFacetPage));
export default FundsFacetPage;
