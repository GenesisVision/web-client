import "./dashboard-programs.scss";

import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import Table from "components/table/table";
import TableCell from "components/table/table-cell";
import TableHeadCell from "components/table/table-head-cell";
import TableRow from "components/table/table-row";
import { GVProgramAvatar } from "gv-react-components";
import Filter from "modules/filtering/components/filter";
import LevelFilter from "modules/filtering/components/level-filter/level-filter";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import { DASHBOARD_PROGRAMS_COLUMNS } from "../../../dashboard.constants";

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
          {/* <Filter
            label="Levels"
            name="level"
            renderValueText={value => `${value[0]}-${value[1]}`}
            value={filtering["level"].value}
            changeFilter={handleFilterChange}
          >
            <LevelFilter />
          </Filter> */}
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
          <TableCell className="dashboard-programs__cell--currency">
            {program.currency}
          </TableCell>
          <TableCell className="dashboard-programs__cell--period">
            <ProgramPeriodPie
              start={program.periodDateStart}
              end={program.periodDateEnd}
            />
          </TableCell>
          <TableCell className="dashboard-programs__cell--profit">
            <NumberFormat
              value={program.profit}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </TableCell>
          <TableCell className="dashboard-programs__cell--chart">
            <ProgramSimpleChart
              data={program.chart}
              isPositive={program.profit >= 0}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default translate()(Dashboardprograms);
