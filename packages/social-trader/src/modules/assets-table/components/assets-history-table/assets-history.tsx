import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import TableContainer from "components/table/components/table-container";
import { ASSETS_HISTORY_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetHistoryTableFilters from "modules/assets-table/components/assets-history-table/asset-history-table-filters";
import AssetHistoryTableRow from "modules/assets-table/components/assets-history-table/asset-history-table-row";
import { assetsHistoryLoaderDataWithCount } from "modules/assets-table/components/assets-history-table/assets-history-table.loader-data";
import AssetsHistoryTableHeaderCell from "modules/assets-table/components/assets-history-table/assets-history-table-header-cell";
import React, { useCallback } from "react";
import { RootState } from "reducers/root-reducer";

const _AssetsHistory: React.FC<Props> = ({
  itemSelector,
  getItems,
  dataSelector
}) => {
  const renderHeader = useCallback(
    column => <AssetsHistoryTableHeaderCell column={column} />,
    []
  );
  const renderBodyRow = useCallback(
    event => <AssetHistoryTableRow event={event} />,
    []
  );

  const renderFilters = useCallback(
    (updateFilter, filtering) => (
      <AssetHistoryTableFilters
        updateFilter={updateFilter}
        filtering={filtering}
      />
    ),
    []
  );

  return (
    <TableContainer
      loaderData={assetsHistoryLoaderDataWithCount()}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      columns={ASSETS_HISTORY_TABLE_COLUMNS}
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

const AssetsHistory = React.memo(_AssetsHistory);
export default AssetsHistory;
