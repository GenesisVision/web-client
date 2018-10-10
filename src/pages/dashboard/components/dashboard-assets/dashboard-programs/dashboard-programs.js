import "./dashboard-programs.scss";

import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVButton } from "gv-react-components";
import { TableCell, TableRow } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

import { composeProgramDetailsUrl } from "../../../../programs/programs.routes";
import {
  DASHBOARD_PROGRAMS_COLUMNS,
  DASHBOARD_PROGRAMS_FILTERS,
  DASHBOARD_PROGRAMS_SORTING
} from "../../../dashboard.constants";
import { getDashboardPrograms } from "../../../services/dashboard-programs.service";

class Dashboardprograms extends Component {
  fetchPrograms = filters => {
    return getDashboardPrograms().then(({ data }) => {
      return { items: data.programs, total: data.total };
    });
  };

  render() {
    const { t } = this.props;
    return (
      <TableModule
        paging={DEFAULT_PAGING}
        sorting={DASHBOARD_PROGRAMS_SORTING}
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
            />
          </Fragment>
        )}
        renderHeader={column => (
          <span className={`dashboard-programs__cell--${column.name}`}>
            {t(`dashboard-page.programs-header.${column.name}`)}
          </span>
        )}
        renderBodyRow={program => (
          <TableRow>
            <TableCell className="dashboard-programs__cell--title">
              <div className="dashboard-programs__cell--avatar-title">
                <AssetAvatar
                  url={program.logo}
                  level={program.level}
                  alt={program.title}
                />
                <Link to={composeProgramDetailsUrl(program.url)}>
                  <GVButton variant="text" color="secondary">
                    {program.title}
                  </GVButton>
                </Link>
              </div>
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
              <ProgramSimpleChart data={program.chart} programId={program.id} />
            </TableCell>
            <TableCell className="dashboard-programs__cell--status">
              Status
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(Dashboardprograms);
