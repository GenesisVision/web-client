import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { ProgramDetailsListItem } from "gv-api-web";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import ProgramTableRowShort from "modules/programs-table/components/programs-table/program-table-row-short";
import * as React from "react";
import { useCallback } from "react";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableSortingValue from "./program-table-sorting";
import { programListLoaderData } from "./program-table.loader-data";
import { PROGRAMS_COLUMNS } from "./programs.constants";
import "./programs.scss";

interface IProgramsTableProps extends ITableProps {
  currencies?: string[];
  data?: ProgramDetailsListItem[];
  title?: string;
}

const _ProgramsTable: React.FC<IProgramsTableProps> = ({
  outerView,
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
      outerView={outerView}
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
