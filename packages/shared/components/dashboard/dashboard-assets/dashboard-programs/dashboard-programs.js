import "./dashboard-programs.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
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
import { formatPercent, formatValue } from "shared/utils/formatter";

import dashboardProgramsTableSelector from "./dashboard-programs.selector";

class DashboardPrograms extends Component {
  render() {
    const {
      t,
      role,
      getDashboardPrograms,
      createButtonToolbar,
      createProgram,
      title
    } = this.props;
    return (
      <TableContainer
        createButtonToolbar={createButtonToolbar}
        emptyMessage={createProgram}
        getItems={getDashboardPrograms}
        dataSelector={dashboardProgramsTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_PROGRAMS_COLUMNS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </Fragment>
        )}
        renderHeader={column => (
          <span
            className={`programs-table__cell dashboard-programs__cell dashboard-programs__cell--${
              column.name
            }`}
          >
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.dashboard-page.programs-header.${column.name}`
            )}
          </span>
        )}
        renderBodyRow={(program, updateRow) => (
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
              {formatPercent(program.personalDetails.gvtValue)} GVT
            </TableCell>
            <TableCell className="programs-table__cell dashboard-programs__cell--profit">
              <NumberFormat
                value={formatValue(program.statistic.profitPercent)}
                suffix="%"
                displayType="text"
              />
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
  }
}

export default translate()(DashboardPrograms);
