import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import * as React from "react";
import { useCallback } from "react";
import AssetsTableHeaderCell from "modules/assets-table/components/assets-table/assets-table-header-cell";
import AssetTableRow from "modules/assets-table/components/assets-table/asset-table-row";
import { CoinsAssetResponse } from "gv-api-web";
import { assetsListLoaderDataWithCount } from "modules/assets-table/components/assets-table/assets-table.loader-data";
import { ASSETS_TABLE_COLUMNS } from "modules/assets-table/assets.constants";

interface Props extends ITableProps {
  loaderCount?: number;
  data?: CoinsAssetResponse[];
}

const _AssetsTable: React.FC<Props> = ({
  loaderCount,
  showSwitchView = false,
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  renderMappings,
  paging,
  updatePaging,
  title,
  asLinkPagination
}) => (
  <Table
    loaderData={assetsListLoaderDataWithCount(loaderCount)}
    filtering={filtering}
    updateFilter={updateFilter}
    title={title}
    sorting={sorting}
    updateSorting={updateSorting}
    paging={paging}
    updatePaging={updatePaging}
    columns={ASSETS_TABLE_COLUMNS}
    items={data}
    asLinkPagination={asLinkPagination}
    showSwitchView={showSwitchView}
    renderFilters={renderFilters}
    renderMappings={renderMappings}
    renderHeader={useCallback(
      column => (
        <AssetsTableHeaderCell column={column} />
      ),
      []
    )}
    renderBodyRow={useCallback(
      asset => (
        <AssetTableRow asset={asset} />
      ),
      []
    )}
    renderBodyCard={useCallback(
      fund => (
        <FundCard fund={fund} />
      ),
      []
    )}
  />
);

const AssetsTable = React.memo(_AssetsTable);
export default AssetsTable;
