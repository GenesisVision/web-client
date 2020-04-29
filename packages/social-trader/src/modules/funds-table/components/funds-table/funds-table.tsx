import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { UpdateRowFuncType } from "components/table/components/table.types";
import { FundDetailsListItem } from "gv-api-web";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import FundsTableRow from "modules/funds-table/components/funds-table/fund-table-row";
import * as React from "react";
import { useCallback } from "react";

import FundTableSortingValue from "./fund-table-sorting";
import { fundListLoaderDataWithCount } from "./fund-table.loader-data";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";
import "./funds-table.scss";

interface Props extends ITableProps {
  withDispatch?: boolean;
  updateRow?: UpdateRowFuncType;
  loaderCount?: number;
  data?: FundDetailsListItem[];
}

const _FundsTable: React.FC<Props> = ({
  outerView,
  loaderCount,
  showSwitchView = true,
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
    outerView={outerView}
    loaderData={fundListLoaderDataWithCount(loaderCount)}
    filtering={filtering}
    updateFilter={updateFilter}
    title={title}
    sorting={sorting}
    updateSorting={updateSorting}
    paging={paging}
    updatePaging={updatePaging}
    columns={FUNDS_TABLE_COLUMNS}
    items={data}
    asLinkPagination={asLinkPagination}
    showSwitchView={showSwitchView}
    renderFilters={renderFilters}
    renderMappings={renderMappings}
    renderHeader={useCallback(
      column => (
        <FundsTableHeaderCell column={column} />
      ),
      []
    )}
    renderSorting={useCallback(
      column => (
        <FundTableSortingValue column={column} />
      ),
      []
    )}
    renderBodyRow={useCallback(
      fund => (
        <FundsTableRow fund={fund} />
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

const FundsTable = React.memo(_FundsTable);
export default FundsTable;
