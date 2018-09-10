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
      filtering={filtering}
      updateFilter={updateFilter}
      paging={paging}
      updatePaging={updatePaging}
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderFilters={handleFilterChange => (
        <Fragment>
          <LevelFilter
            name="level"
            value={filtering["level"]}
            onChange={handleFilterChange}
          />
          <SelectFilter
            name="currency"
            label="Currency"
            value={filtering["currency"]}
            values={selectFilterValues}
            onChange={handleFilterChange}
          />
          <DateRangeFilter
            name="dateRange"
            value={filtering["dateRange"]}
            onChange={handleFilterChange}
          />
        </Fragment>
      )}
      renderHeader={({ sortingName, isAsc, handleSorting }) => (
        <Fragment>
          {PROGRAMS_COLUMNS.map(x => {
            return (
              <TableHeadCell
                key={x.name}
                className={`programs-table__cell--${x.name}`}
                sortable={x.sortingName !== undefined}
                active={x.sortingName === sortingName}
                isAsc={isAsc}
                onClick={handleSorting(x.sortingName)}
              >
                {t(`programs-page.programs-header.${x.name}`)}
              </TableHeadCell>
            );
          })}
          {isAuthenticated && (
            <TableHeadCell className="programs-table__cell--favorite" />
          )}
        </Fragment>
      )}
      renderBodyRow={program => (
        <ProgramTableRow
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
    />
  );
};

export default translate()(ProgramsTable);
