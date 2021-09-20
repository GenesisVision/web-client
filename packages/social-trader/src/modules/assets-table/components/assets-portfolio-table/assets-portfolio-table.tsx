import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { CoinsAsset } from "gv-api-web";
import { ASSETS_PORTFOLIO_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetPortfolioTableRow from "modules/assets-table/components/assets-portfolio-table/asset-portfolio-table-row";
import { assetsPortfolioListLoaderDataWithCount } from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table.loader-data";
import AssetsPortfolioTableHeaderCell from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table-header-cell";
import * as React from "react";
import { useCallback } from "react";

interface Props extends ITableProps {
  loaderCount?: number;
  data?: CoinsAsset[];
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
    columns={ASSETS_PORTFOLIO_TABLE_COLUMNS}
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
  />
);

const AssetsPortfolioTable = React.memo(_AssetsPortfolioTable);
export default AssetsPortfolioTable;
