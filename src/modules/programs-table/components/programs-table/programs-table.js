import "./programs.scss";

import { Table, TableHeadCell } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import LevelFilter from "modules/table/components/filtering/level-filter/level-filter";
import SelectFilter from "modules/table/components/filtering/select-filter/select-filter";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

import {
  CURRENCY_FILTER_VALUES,
  PROGRAMS_COLUMNS
} from "../../programs.constants";
import ProgramTableRow from "./program-table-row";
import ProgramCard from "./program-card";

const selectFilterValues = [
  { value: undefined, label: "All" },
  ...CURRENCY_FILTER_VALUES.map(x => ({ value: x, label: x }))
];

const ProgramsTable = ({
  t,
  data,
  isPending,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  paging,
  updatePaging,
  toggleFavorite,
  isAuthenticated
}) => {
  return (
    <Table
      title="All programs"
      sorting={sorting}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderFilters={() => (
        <Fragment>
          <LevelFilter
            name="level"
            value={filtering["level"]}
            onChange={updateFilter}
          />
          <SelectFilter
            name="currency"
            label="Currency"
            value={filtering["currency"]}
            values={selectFilterValues}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name="dateRange"
            value={filtering["dateRange"]}
            onChange={updateFilter}
          />
        </Fragment>
      )}
      renderHeader={({ column, sortingName, isAsc, handleSorting }) => {
        if (!isAuthenticated && column.name === "favorite") return null;
        return (
          <TableHeadCell
            key={column.name}
            className={`programs-table__cell--${column.name}`}
            sortable={column.sortingName !== undefined}
            active={column.sortingName === sortingName}
            isAsc={isAsc}
            onClick={handleSorting(column.sortingName)}
          >
            {t(`programs-page.programs-header.${column.name}`)}
          </TableHeadCell>
        );
      }}
      renderBodyRow={program => (
        <ProgramTableRow
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
      renderBodyCard={program => (
        <ProgramCard
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
    />
  );
};

export default translate()(ProgramsTable);
