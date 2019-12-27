import "./funds-table.scss";

import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { FundDetailsListItem } from "gv-api-web";
import * as React from "react";

import FundCard from "./fund-card";
import FundsTableRow from "./fund-table-row";
import FundTableSortingValue from "./fund-table-sorting";
import { fundListLoaderData } from "./fund-table.loader-data";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";

interface Props extends ITableProps {
  data?: FundDetailsListItem[];
  isAuthenticated: boolean;
}

const _FundsTable: React.FC<Props> = ({
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  renderMappings,
  paging,
  updatePaging,
  isAuthenticated,
  title
}) => (
  <Table
    loaderData={fundListLoaderData}
    filtering={filtering}
    updateFilter={updateFilter}
    title={title}
    sorting={sorting}
    updateSorting={updateSorting}
    paging={paging}
    updatePaging={updatePaging}
    columns={FUNDS_TABLE_COLUMNS}
    items={data}
    showSwitchView
    renderFilters={renderFilters}
    renderMappings={renderMappings}
    renderHeader={column => (
      <FundsTableHeaderCell column={column} isAuthenticated={isAuthenticated} />
    )}
    renderSorting={column => (
      <FundTableSortingValue
        column={column}
        isAuthenticated={isAuthenticated}
      />
    )}
    renderBodyRow={fund => (
      <FundsTableRow
        withDispatch
        fund={fund}
        isAuthenticated={isAuthenticated}
      />
    )}
    renderBodyCard={fund => <FundCard title={title as string} fund={fund} />}
  />
);

const FundsTable = React.memo(_FundsTable);
export default FundsTable;
