import "./programs.scss";

import React from "react";
import { Table } from "shared/components/table/components";

import ProgramCard from "./program-card";
import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import { PROGRAMS_COLUMNS } from "./programs.constants";

const ProgramsTable = ({
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
  redirectToLogin,
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
      isPending={isPending || data.isPending}
      renderFilters={renderFilters}
      renderHeader={column => (
        <ProgramTableHeaderCell
          column={column}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderBodyRow={program => (
        <ProgramTableRow
          showRating={showRating}
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderBodyCard={program => (
        <ProgramCard
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
    />
  );
};

export default ProgramsTable;
