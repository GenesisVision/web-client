import "./dashboard-programs.scss";

import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import ProgramPeriodEnd from "shared/components/program-period/program-period-end/program-period-end";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import { GVButton } from "gv-react-components";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { formatPercent, formatValue } from "shared/utils/formatter";

import {
  DASHBOARD_PROGRAMS_COLUMNS,
  DASHBOARD_PROGRAMS_FILTERS
} from "../../../dashboard.constants";
import { getDashboardPrograms } from "../../../services/dashboard-programs.service";

class Dashboardprograms extends Component {
  fetchPrograms = filters => {
    return getDashboardPrograms(filters).then(({ data }) => {
      return { items: data.programs, total: data.total };
    });
  };

  render() {
    const { t, title } = this.props;
    return (
      <TableModule
        paging={DEFAULT_PAGING}
        filtering={{
          dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
        }}
        defaultFilters={DASHBOARD_PROGRAMS_FILTERS}
        getItems={this.fetchPrograms}
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
            className={`programs-table__cell dashboard-programs__cell--${
              column.name
            }`}
          >
            {t(`dashboard-page.programs-header.${column.name}`)}
          </span>
        )}
        renderBodyRow={program => (
          <TableRow>
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
              {program.personalDetails.status}
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(Dashboardprograms);
