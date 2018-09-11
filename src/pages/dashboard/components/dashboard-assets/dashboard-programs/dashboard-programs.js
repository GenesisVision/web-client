import "./dashboard-programs.scss";

import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import {
  Table,
  TableCell,
  TableHeadCell,
  TableRow
} from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";

import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "../../../../../modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import withTable from "../../../../../modules/table/components/with-table";
import { DEFAULT_PAGING } from "../../../../../modules/table/reducers/table-paging.reducer";
import {
  DASHBOARD_PROGRAMS_COLUMNS,
  DASHBOARD_PROGRAMS_FILTERS,
  DASHBOARD_PROGRAMS_SORTING
} from "../../../dashboard.constants";
import { getDashboardPrograms } from "../../../services/dashboard-programs.service";

const Dashboardprograms = ({
  t,
  isPending,
  data,
  filtering,
  updateFilter,
  paging,
  updatePaging,
  sorting,
  updateSorting
}) => {
  return (
    <Table
      filtering={filtering}
      updateFilter={updateFilter}
      sorting={sorting}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={DASHBOARD_PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderFilters={handleFilterChange => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={handleFilterChange}
          />
        </Fragment>
      )}
      renderHeader={({ column, sortingName, isAsc, handleSorting }) => (
        <TableHeadCell
          key={column.name}
          className={`dashboard-programs__cell--${column.name}`}
          sortable={column.sortingName !== undefined}
          active={column.sortingName === sortingName}
          isAsc={isAsc}
          onClick={handleSorting(column.sortingName)}
        >
          {t(`dashboard-page.programs-header.${column.name}`)}
        </TableHeadCell>
      )}
      renderBodyRow={program => (
        <TableRow>
          <TableCell className="dashboard-programs__cell--title">
            <GVProgramAvatar
              url={program.logo}
              level={program.level}
              alt={program.title}
            />
            {program.title}
          </TableCell>
          <TableCell className="dashboard-programs__cell--share">
            {program.dashboardProgramDetails.share}
          </TableCell>
          <TableCell className="dashboard-programs__cell--currency">
            {program.currency}
          </TableCell>
          <TableCell className="dashboard-programs__cell--period">
            <ProgramPeriodPie
              start={program.periodStarts}
              end={program.periodEnds}
            />
          </TableCell>
          <TableCell className="dashboard-programs__cell--value">
            {program.statistic.currentValue}
          </TableCell>
          <TableCell className="dashboard-programs__cell--profit">
            <NumberFormat
              value={program.statistic.profitPercent}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </TableCell>
          <TableCell className="dashboard-programs__cell--chart">
            <ProgramSimpleChart
              data={program.chart}
              isPositive={program.statistic.profitValue >= 0}
            />
          </TableCell>
          <TableCell className="dashboard-programs__cell--status">
            Status
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default compose(
  translate(),
  withTable({
    fetchOnMount: true,
    getItems: getDashboardPrograms,
    paging: DEFAULT_PAGING,
    sorting: DASHBOARD_PROGRAMS_SORTING,
    filtering: {
      dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
    },
    defaultFilters: DASHBOARD_PROGRAMS_FILTERS
  })
)(Dashboardprograms);
