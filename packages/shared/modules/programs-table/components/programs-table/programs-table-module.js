import "./programs.scss";

import React, { Fragment } from "react";
import { translate } from "react-i18next";
import ProgramCard from "./program-card";
import ProgramTableRow from "./program-table-row";
import {
  CURRENCY_FILTER_NAME,
  LEVEL_FILTER_NAME,
  PROGRAMS_COLUMNS
} from "./programs.constants";
import { Table } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";

const ProgramsTableModule = ({
  t,
  columns,
  showRating,
  enableFiltering,
  showSwitchView,
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
    ...(currencies || []).map(x => ({ value: x, label: x }))
  ];
  return (
    <Table
      title={title}
      showSwitchView={showSwitchView}
      sorting={sorting}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={columns || PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderFilters={
        enableFiltering &&
        (() => (
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
        ))
      }
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
          showRating={showRating}
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
