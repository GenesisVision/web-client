import "./programs.scss";

import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Table } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";

import ProgramCard from "./program-card";
import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import { composeCurrencyFilter } from "./program-table.helpers";
import {
  CURRENCY_FILTER_NAME,
  LEVEL_FILTER_NAME,
  PROGRAMS_COLUMNS
} from "./programs.constants";

const ProgramsTable = ({
  t,
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
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={columns || PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={isPending || data.isPending}
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
            values={composeCurrencyFilter(currencies)}
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

export default translate()(ProgramsTable);
