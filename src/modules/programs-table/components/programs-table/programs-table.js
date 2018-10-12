import "./programs.scss";

import { Table } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import LevelFilter from "modules/table/components/filtering/level-filter/level-filter";
import SelectFilter from "modules/table/components/filtering/select-filter/select-filter";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

import { DATE_RANGE_FILTER_NAME } from "../../../table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  CURRENCY_FILTER_NAME,
  CURRENCY_FILTER_VALUES,
  LEVEL_FILTER_NAME,
  PROGRAMS_COLUMNS
} from "../../programs.constants";
import ProgramCard from "./program-card";
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
  redirectToLogin,
  isAuthenticated,
  title
}) => {
  return (
    <Table
      title={title}
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
            name={LEVEL_FILTER_NAME}
            value={filtering[LEVEL_FILTER_NAME]}
            onChange={updateFilter}
          />
          <SelectFilter
            name={CURRENCY_FILTER_NAME}
            label="Currency"
            value={filtering[CURRENCY_FILTER_NAME]}
            values={selectFilterValues}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
          />
        </Fragment>
      )}
      renderHeader={column => {
        if (!isAuthenticated && column.name === "favorite") return null;
        return (
          <span className={`programs-table__cell--${column.name}`}>
            {t(`programs-page.programs-header.${column.name}`)}
          </span>
        );
      }}
      renderBodyRow={program => (
        <ProgramTableRow
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
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
