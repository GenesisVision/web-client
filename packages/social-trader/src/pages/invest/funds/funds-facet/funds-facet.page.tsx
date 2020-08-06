import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import { fetchFunds } from "modules/funds-table/services/funds-table.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import FundsFacetTable from "./components/funds-facet-table";

interface Props {
  id: string;
}

const _FundsFacetPage: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const getFunds = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchFunds(filters),
    []
  );
  return (
    <Page
      description={`${t("funds-page:title")} ${t(
        `asset-list:facets.${id}`
      )} facet list`}
      showTitle
      title={`${t("funds-page:title")} ${t(`asset-list:facets.${id}`)}`}
    >
      <DefaultTableBlock>
        <FacetContainer
          id={id}
          asset={FACET_ASSET.FUNDS}
          TableContainer={FundsFacetTable}
          getItems={getFunds}
        />
      </DefaultTableBlock>
    </Page>
  );
};

const FundsFacetPage = React.memo(_FundsFacetPage);
export default FundsFacetPage;
