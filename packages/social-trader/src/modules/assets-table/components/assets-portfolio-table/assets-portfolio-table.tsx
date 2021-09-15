import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { CoinsAssetResponse } from "gv-api-web";
import { ASSETS_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetPortfolioTableRow from "modules/assets-table/components/assets-portfolio-table/asset-portfolio-table-row";
import { assetsPortfolioListLoaderDataWithCount } from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table.loader-data";
import AssetsPortfolioTableHeaderCell from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table-header-cell";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import * as React from "react";
import { useCallback } from "react";

interface Props extends ITableProps {
  loaderCount?: number;
  data?: CoinsAssetResponse[];
}

const _AssetsPortfolioTable: React.FC<Props> = ({
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
    loaderData={assetsPortfolioListLoaderDataWithCount(loaderCount)}
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
        <AssetsPortfolioTableHeaderCell column={column} />
      ),
      []
    )}
    renderBodyRow={useCallback(
      asset => (
        <AssetPortfolioTableRow asset={asset} />
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

const AssetsPortfolioTable = React.memo(_AssetsPortfolioTable);
export default AssetsPortfolioTable;
