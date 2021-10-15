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
  dataSelector
}) => {
  const renderHeader = useCallback(
    column => <AssetsTableHeaderCell column={column} />,
    []
  );
  const renderBodyRow = useCallback(
    asset => <AssetTableRow asset={asset} />,
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
    />
  );
};

interface Props {
  itemSelector: (state: RootState) => { [keys: string]: any };
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
}

const AssetsCoins = React.memo(_AssetsCoins);
export default AssetsCoins;
