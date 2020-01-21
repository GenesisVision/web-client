import "./programs.scss";

import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { ProgramDetailsListItem } from "gv-api-web";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { useCallback } from "react";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableSortingValue from "./program-table-sorting";
import { programListLoaderData } from "./program-table.loader-data";
import { PROGRAMS_COLUMNS } from "./programs.constants";

const ProgramCard = dynamic(() => import("./program-card"));
const ProgramTableRowShort = dynamic(() => import("./program-table-row-short"));

export const FAVORITE_COLUMN_NAME = "favorite";

interface IProgramsTableProps extends ITableProps {
  currencies?: string[];
  data?: ProgramDetailsListItem[];
  title?: string;
}

const _ProgramsTable: React.FC<IProgramsTableProps> = ({
  renderMappings,
  disableTitle,
  columns,
  showSwitchView,
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  paging,
  updatePaging,
  title,
  asLinkPagination
}) => {
  return (
    <Table
      asLinkPagination={asLinkPagination}
      loaderData={programListLoaderData}
      renderMappings={renderMappings}
      disableTitle={disableTitle}
      title={title}
      showSwitchView={showSwitchView}
      sorting={sorting}
      filtering={filtering}
      updateFilter={updateFilter}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={columns || PROGRAMS_COLUMNS}
      items={data}
      renderFilters={renderFilters}
      renderHeader={useCallback(
        column => (
          <ProgramTableHeaderCell column={column} />
        ),
        []
      )}
      renderSorting={useCallback(
        column => (
          <ProgramTableSortingValue column={column} />
        ),
        []
      )}
      renderBodyRow={useCallback(
        (program: ProgramDetailsListItem) => (
          <ProgramTableRowShort withDispatch program={program} />
        ),
        []
      )}
      renderBodyCard={useCallback(
        (program: ProgramDetailsListItem) => (
          <ProgramCard program={program} />
        ),
        []
      )}
    />
  );
};

const ProgramsTable = React.memo(_ProgramsTable);
export default ProgramsTable;
