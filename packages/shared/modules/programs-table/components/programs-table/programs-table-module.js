import "shared/components/programs-table/programs.scss";

import React, { Fragment } from "react";
import { translate } from "react-i18next";
import ProgramCard from "shared/components/programs-table/program-card";
import ProgramTableRow from "shared/components/programs-table/program-table-row";
import {
  CURRENCY_FILTER_NAME,
  LEVEL_FILTER_NAME,
  PROGRAMS_COLUMNS
} from "shared/components/programs-table/programs.constants";
import { Table } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";

const ProgramsTableModule = ({
  t,
  currencies,
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
  const selectFilterValues = [
    { value: undefined, label: "All" },
    ...currencies.map(x => ({ value: x, label: x }))
  ];
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
            startLabel={t("filters.date-range.program-start")}
          />
        </Fragment>
      )}
      renderHeader={column => {
        if (!isAuthenticated && column.name === "favorite") return null;
        return (
          <span
            className={`programs-table__cell  programs-table__cell--${
              column.name
            }`}
          >
            {t(`programs-page.programs-header.${column.name}`)}
          </span>
        );
      }}
      renderBodyRow={program => (
        <ProgramTableRow
          title={title}
          program={program}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
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

export default translate()(ProgramsTableModule);
