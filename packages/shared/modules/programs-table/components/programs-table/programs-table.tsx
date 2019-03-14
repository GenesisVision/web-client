import "./programs.scss";

import * as React from "react";
import { Table } from "shared/components/table/components";

import ProgramCard from "./program-card";
import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import ProgramTableSortingValue from "./program-table-sorting";
import { PROGRAMS_COLUMNS } from "./programs.constants";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { IPaging } from "shared/components/table/helpers/paging.helpers";
import { ProgramDetails, ProgramsList } from "gv-api-web";

interface IProgramsTableProps {
  disableTitle?: boolean;
  columns?: SortingColumn[];
  showRating?: boolean;
  showSwitchView?: boolean;
  currencies: string[];
  data: ProgramsList;
  isPending?: boolean;
  sorting: string;
  updateSorting(opt: string): (dispatch: any, getState: any) => void;
  filtering: Object;
  updateFilter(filter: any): void;
  renderFilters?(
    updateFilter: (filter: any) => void,
    filtering: Object
  ): JSX.Element;
  paging: IPaging;
  updatePaging(page: number): void;
  toggleFavorite(programId: string, isFavorite: boolean): void;
  isAuthenticated?: boolean;
  title?: string;
  redirectToLogin?(): void;
}

const ProgramsTable: React.FC<IProgramsTableProps> = ({
  disableTitle,
  columns,
  showRating,
  showSwitchView,
  currencies,
  data,
  isPending,
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
      items={data.programs}
      // isPending={isPending || data.isPending}
      renderFilters={renderFilters}
      renderHeader={column => (
        <ProgramTableHeaderCell
          column={column}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderSorting={column => (
        <ProgramTableSortingValue
          column={column}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderBodyRow={(program: ProgramDetails) => (
        <ProgramTableRow
          showRating={showRating}
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
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

export default ProgramsTable;
