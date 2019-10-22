import "./programs.scss";

import { ProgramDetailsOld } from "gv-api-web";
import * as React from "react";
import { Table } from "shared/components/table/components";
import { ITableProps } from "shared/components/table/components/table";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";

import ProgramCard from "./program-card";
import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import ProgramTableSortingValue from "./program-table-sorting";
import { PROGRAMS_COLUMNS } from "./programs.constants";
import { programListLoaderData } from "./program-table.loader-data";

export const FAVORITE_COLUMN_NAME = "favorite";

interface IProgramsTableProps extends ITableProps {
  showRating?: boolean;
  currencies?: string[];
  data?: ProgramDetailsOld[];
  toggleFavorite: TableToggleFavoriteHandlerType;
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
  toggleFavorite,
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
      renderBodyRow={(program: ProgramDetailsOld) => (
        <ProgramTableRow
          showRating={Boolean(showRating)}
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={Boolean(isAuthenticated)}
        />
      )}
      renderBodyCard={(program: ProgramDetailsOld) => (
        <ProgramCard
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
        />
      )}
    />
  );
};

const ProgramsTable = React.memo(_ProgramsTable);
export default ProgramsTable;
