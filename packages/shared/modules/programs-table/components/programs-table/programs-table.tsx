import "./programs.scss";

import { ProgramDetails } from "gv-api-web";
import * as React from "react";
import { Table } from "shared/components/table/components";
import { FilteringType, SortingColumn } from "shared/components/table/components/filtering/filter.type";
import {
  RenderFiltersFuncType,
  TableToggleFavoriteHandlerType,
  UpdatePagingFuncType,
  UpdateSortingFuncType
} from "shared/components/table/components/table.types";
import { IPaging } from "shared/components/table/helpers/paging.helpers";

import ProgramCard from "./program-card";
import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import ProgramTableSortingValue from "./program-table-sorting";
import { PROGRAMS_COLUMNS } from "./programs.constants";
import { programListLoaderData } from "./program-table.loader-data";

export const FAVORITE_COLUMN_NAME = "favorite";

interface IProgramsTableProps {
  disableTitle?: boolean;
  columns?: SortingColumn[];
  showRating?: boolean;
  showSwitchView?: boolean;
  currencies?: string[];
  data?: ProgramDetails[];
  sorting?: string;
  updateSorting?: UpdateSortingFuncType;
  filtering?: FilteringType;
  updateFilter?(filter: any): void;
  renderFilters?: RenderFiltersFuncType;
  paging: IPaging;
  updatePaging: UpdatePagingFuncType;
  toggleFavorite: TableToggleFavoriteHandlerType;
  isAuthenticated?: boolean;
  title: string;
  redirectToLogin?(): void;
}

const _ProgramsTable: React.FC<IProgramsTableProps> = ({
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
      renderBodyRow={(program: ProgramDetails) => (
        <ProgramTableRow
          showRating={Boolean(showRating)}
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={Boolean(isAuthenticated)}
        />
      )}
      renderBodyCard={(program: ProgramDetails) => (
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
