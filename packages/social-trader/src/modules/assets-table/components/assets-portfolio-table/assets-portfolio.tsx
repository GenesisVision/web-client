import { CoinsAssetFilterContainer } from "components/table/components/filtering/fund-asset-filter/coins-asset-filter.container";
import { FUND_ASSET_FILTER_NAME } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import TableContainer from "components/table/components/table-container";
import { ASSETS_PORTFOLIO_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetPortfolioTableRow from "modules/assets-table/components/assets-portfolio-table/asset-portfolio-table-row";
import AssetsPortfolioTableHeaderCell from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table-header-cell";
import { assetsListLoaderDataWithCount } from "modules/assets-table/components/assets-table/assets-table.loader-data";
import React, { useCallback } from "react";
import { RootState } from "reducers/root-reducer";

const _AssetsPortfolio: React.FC<Props> = ({
  itemSelector,
  getItems,
  dataSelector
}) => {
  const renderHeader = useCallback(
    column => <AssetsPortfolioTableHeaderCell column={column} />,
    []
  );
  const renderBodyRow = useCallback(
    (asset, updateRow) => (
      <AssetPortfolioTableRow asset={asset} onApply={updateRow} />
    ),
    []
  );

  const renderFilters = useCallback(
    (updateFilter, filtering) => (
      <CoinsAssetFilterContainer
        name={FUND_ASSET_FILTER_NAME}
        value={filtering[FUND_ASSET_FILTER_NAME] as string[]}
        onChange={updateFilter}
      />
    ),
    []
  );

  return (
    <TableContainer
      loaderData={assetsListLoaderDataWithCount()}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      columns={ASSETS_PORTFOLIO_TABLE_COLUMNS}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
      renderFilters={renderFilters}
    />
  );
};

interface Props {
  itemSelector: (state: RootState) => { [keys: string]: any };
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
}

const AssetsPortfolio = React.memo(_AssetsPortfolio);
export default AssetsPortfolio;
