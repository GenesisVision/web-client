import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import Surface from "components/surface/surface";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { fetchFunds } from "modules/funds-table/services/funds-table.service";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { IDataModel } from "shared/constants/constants";

import FundsFacetTable from "./components/funds-facet-table";

const _FundsFacetPage: React.FC<Props> = ({ id, t }) => {
  const getFunds = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchFunds(filters),
    []
  );
  return (
    <Page title={t("funds-page.title")}>
      <Surface className="funds-table-container">
        <FacetContainer
          id={id}
          asset={FACET_ASSET.FUNDS}
          TableContainer={FundsFacetTable}
          getItems={getFunds}
        />
      </Surface>
    </Page>
  );
};

interface Props extends WithTranslation {
  id: string;
}

const FundsFacetPage = translate()(React.memo(_FundsFacetPage));
export default FundsFacetPage;
