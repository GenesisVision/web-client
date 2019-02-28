import "./dashboard-programs.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React, { Fragment, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { Action } from "redux";
import AssetStatus from "shared/components/asset-status/asset-status";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { DASHBOARD_PROGRAMS_COLUMNS } from "shared/components/dashboard/dashboard.constants";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import ProgramPeriodEnd from "shared/components/program-period/program-period-end/program-period-end";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { PROGRAM } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import {
  formatCurrencyValue,
  formatPercent,
  formatValue
} from "shared/utils/formatter";

import {
  Column,
  IUpdateFilterFunc
} from "shared/components/table/components/table.types";
import dashboardProgramsTableSelector from "./dashboard-programs.selector";
import Profitability from "shared/components/profitability/profitability";

interface IDashboardProgramsProps {
  role: string;
  title: string;
  getDashboardPrograms(filters: any): Action;
  createButtonToolbar?(text: string, route: string): JSX.Element;
  createProgram?(): void;
}

const DashboardPrograms: FunctionComponent<
  InjectedTranslateProps & IDashboardProgramsProps
> = ({
  t,
  role,
  getDashboardPrograms,
  createButtonToolbar,
  createProgram,
  title
}) => {
  return (
    <TableContainer
      createButtonToolbar={createButtonToolbar}
      emptyMessage={createProgram}
      getItems={getDashboardPrograms}
      dataSelector={dashboardProgramsTableSelector}
      isFetchOnMount={true}
      columns={DASHBOARD_PROGRAMS_COLUMNS}
      renderFilters={(updateFilter: IUpdateFilterFunc, filtering: any) => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </Fragment>
      )}
      renderHeader={(column: Column) => (
        <span
          className={`programs-table__cell dashboard-programs__cell dashboard-programs__cell--${
            column.name
          }`}
        >
          {t(
            `${process.env.REACT_APP_PLATFORM}.dashboard-page.programs-header.${
              column.name
            }`
          )}
        </span>
      )}
      renderBodyRow={(program: any, updateRow: any) => (
        <TableRow
          className={classnames({
            "table__row--pretender": program.rating.canLevelUp
          })}
        >
          <TableCell className="programs-table__cell dashboard-programs__cell--title">
            <div className="dashboard-programs__cell--avatar-title">
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <AssetAvatar
                  url={program.logo}
                  level={program.level}
                  alt={program.title}
                  color={program.color}
                  tooltip={
                    <LevelTooltip
                      level={program.level}
                      canLevelUp={program.rating.canLevelUp}
                    />
                  }
                />
              </Link>
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {program.title}
                </GVButton>
              </Link>
            </div>
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--share">
            {formatPercent(program.dashboardAssetsDetails.share)}%
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--currency">
            {program.currency}
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--period">
            <ProgramPeriodEnd periodEnds={program.periodEnds} />
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--value">
            {formatCurrencyValue(program.personalDetails.gvtValue, "GVT")} GVT
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--profit">
            <Profitability
              value={formatValue(program.statistic.profitPercent, 2)}
              prefix="sign"
            >
              <NumberFormat
                value={formatValue(program.statistic.profitPercent, 2)}
                suffix="%"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--chart">
            <ProgramSimpleChart data={program.chart} programId={program.id} />
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--status">
            <AssetStatus
              status={program.personalDetails.status}
              id={program.id}
              role={role}
              asset={PROGRAM}
              onCancel={updateRow}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default translate()(DashboardPrograms);
