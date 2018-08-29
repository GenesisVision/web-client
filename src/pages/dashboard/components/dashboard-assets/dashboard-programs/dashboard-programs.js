import "./dashboard-programs.scss";

import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import Table from "components/table/table";
import TableCell from "components/table/table-cell";
import TableHeadCell from "components/table/table-head-cell";
import TableRow from "components/table/table-row";
import { GVProgramAvatar } from "gv-react-components";
import Filter from "modules/filtering/components/filter";
import LevelFilter from "modules/filtering/components/level-filter/level-filter";
import ProgramSimpleChart from "modules/programs-table/components/program-simple-chart/program-simple-chart";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import { DASHBOARD_PROGRAMS_COLUMNS } from "../../../dashboard.constants";

const Dashboardprograms = ({ t, data, filtering, paging }) => {
  return (
    <Table
      filtering={filtering}
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
      renderHeader={
        <Fragment>
          {DASHBOARD_PROGRAMS_COLUMNS.map(x => {
            return (
              <TableHeadCell
                key={x.name}
                className={`dashboard-programs__cell--${x.name}`}
              >
                {t(`dashboard-page.programs-header.${x.name}`)}
              </TableHeadCell>
            );
          })}
        </Fragment>
      }
      renderBodyRow={program => (
        <TableRow className="programs-table__row">
          <TableCell className="programs-table__cell--title">
            <GVProgramAvatar
              url={program.avatar}
              level={program.level}
              alt={program.title}
            />
            {program.title}
          </TableCell>
          <TableCell className="programs-table__cell--balance">
            {program.statistic.balanceInGVT.amount}
          </TableCell>
          <TableCell className="programs-table__cell--currency">
            {program.currency}
          </TableCell>
          <TableCell className="programs-table__cell--investors">
            {program.statistic.investorsCount}
          </TableCell>
          <TableCell className="programs-table__cell--available-to-invest">
            {program.availableForInvestment}
          </TableCell>
          <TableCell className="programs-table__cell--trades">
            {program.statistic.tradesCount}
          </TableCell>
          <TableCell className="programs-table__cell--period">
            <ProgramPeriodPie
              start={program.periodDateStart}
              end={program.periodDateEnd}
            />
          </TableCell>
          <TableCell className="programs-table__cell--drawdown">
            <NumberFormat
              value={program.statistic.drawdownPercent}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </TableCell>
          <TableCell className="programs-table__cell--profit">
            <NumberFormat
              value={program.statistic.profitPercent}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </TableCell>
          <TableCell className="programs-table__cell--chart">
            <ProgramSimpleChart
              data={program.chart}
              isPositive={program.statistic.profitPercent >= 0}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default translate()(Dashboardprograms);
