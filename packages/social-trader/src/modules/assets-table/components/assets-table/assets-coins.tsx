import { CoinsAssetFilterContainer } from "components/table/components/filtering/fund-asset-filter/coins-asset-filter.container";
import { FUND_ASSET_FILTER_NAME } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import TableContainer from "components/table/components/table-container";
import { ASSETS_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetTableRow from "modules/assets-table/components/assets-table/asset-table-row";
import { assetsListLoaderDataWithCount } from "modules/assets-table/components/assets-table/assets-table.loader-data";
import AssetsTableHeaderCell from "modules/assets-table/components/assets-table/assets-table-header-cell";
import React, { useCallback } from "react";
import { RootState } from "reducers/root-reducer";

const _AssetsCoins: React.FC<Props> = ({
  itemSelector,
  getItems,
  dataSelector,
  updateFavorites
}) => {
  const renderHeader = useCallback(
    column => <AssetsTableHeaderCell column={column} />,
    []
  );
  const renderBodyRow = useCallback(
    asset => <AssetTableRow asset={asset} updateFavorites={updateFavorites} />,
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
      columns={ASSETS_TABLE_COLUMNS}
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
  updateFavorites?: (isFavorite: boolean) => void;
}

const AssetsCoins = React.memo(_AssetsCoins);
export default AssetsCoins;
