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
import withTableContainer from "modules/table/components/with-table-container";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";

import { DASHBOARD_PROGRAMS_COLUMNS } from "../../../dashboard.constants";
import dashboardProgramsService, {
  getStorePlace
} from "../../../services/dashboard-programs.service";

const Dashboardprograms = ({
  t,
  isPending,
  data,
  filtering,
  paging,
  sorting
}) => {
  return (
    <Table
      filtering={filtering}
      sorting={sorting}
      paging={paging}
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
      renderHeader={({ sortingName, isAsc, handleSorting }) => (
        <Fragment>
          {DASHBOARD_PROGRAMS_COLUMNS.map(x => {
            return (
              <TableHeadCell
                key={x.name}
                className={`dashboard-programs__cell--${x.name}`}
                sortable={x.sortingName !== undefined}
                active={x.sortingName === sortingName}
                isAsc={isAsc}
                onClick={handleSorting(x.sortingName)}
              >
                {t(`dashboard-page.programs-header.${x.name}`)}
              </TableHeadCell>
            );
          })}
        </Fragment>
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
  withTableContainer(dashboardProgramsService, getStorePlace)
)(Dashboardprograms);
