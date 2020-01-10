import "./programs.scss";

import { Table } from "components/table/components";
import { ITableProps } from "components/table/components/table";
import { ProgramDetailsListItem } from "gv-api-web";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableSortingValue from "./program-table-sorting";
import { programListLoaderData } from "./program-table.loader-data";
import { PROGRAMS_COLUMNS } from "./programs.constants";

const ProgramCard = dynamic(() => import("./program-card"));
const ProgramTableRowShort = dynamic(() => import("./program-table-row-short"));

export const FAVORITE_COLUMN_NAME = "favorite";

interface IProgramsTableProps extends ITableProps {
  showRating?: boolean;
  currencies?: string[];
  data?: ProgramDetailsListItem[];
  isAuthenticated?: boolean;
  title: string;
  redirectToLogin?: () => void;
}

const _ProgramsTable: React.FC<IProgramsTableProps> = ({
  renderMappings,
  disableTitle,
  columns,
  showRating,
  showSwitchView,
  currencies,
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  paging,
  updatePaging,
  isAuthenticated,
  title
}) => {
  return (
    <Table
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
      renderHeader={column => (
        <ProgramTableHeaderCell
          condition={
            !isAuthenticated ||
            (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
          }
          column={column}
        />
      )}
      renderSorting={column => (
        <ProgramTableSortingValue
          condition={
            !isAuthenticated ||
            (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
          }
          column={column}
        />
      )}
      renderBodyRow={(program: ProgramDetailsListItem) => (
        <ProgramTableRowShort
          withDispatch
          showRating={Boolean(showRating)}
          program={program}
        />
      )}
      renderBodyCard={(program: ProgramDetailsListItem) => (
        <ProgramCard title={title} program={program} />
      )}
    />
  );
};

const ProgramsTable = React.memo(_ProgramsTable);
export default ProgramsTable;
