import { SignalDetails } from "gv-api-web";
import { GVButton } from "gv-react-components";
import moment from "moment";
import { getDashboardCopytrading } from "pages/dashboard/services/dashboard-assets.service";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Profitability from "shared/components/profitability/profitability";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import { TableCell } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { Column } from "shared/components/table/components/table.types";
import { IUpdateFilterFunc } from "shared/components/table/components/table.types";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatPercent } from "shared/utils/formatter";
import { formatValue } from "shared/utils/formatter";

import { DASHBOARD_COPYTRADING_COLUMNS } from "./dashboard-copytrading.constants";
import { dashboardCopytradingTableSelector } from "./dashboard-copytrading.selectors";

interface IDashboardCopytradingProps {
  title: string;
}

class DashboardCopytrading extends Component<
  IDashboardCopytradingProps & InjectedTranslateProps
> {
  render() {
    const { t, title } = this.props;
    return (
      <TableContainer
        getItems={getDashboardCopytrading}
        dataSelector={dashboardCopytradingTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_COPYTRADING_COLUMNS}
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
        renderHeader={(column: Column) =>
          t(`investor.dashboard-page.copytrading-header.${column.name}`)
        }
        renderBodyRow={(signal: SignalDetails) => (
          <TableRow>
            <TableCell className="programs-table__cell dashboard-programs__cell--title">
              <div className="dashboard-programs__cell--avatar-title">
                <Link
                  to={{
                    pathname: composeProgramDetailsUrl(signal.url),
                    state: `/ ${title}`
                  }}
                >
                  <AssetAvatar
                    url={signal.logo}
                    alt={signal.title}
                    color={signal.color}
                  />
                </Link>
                <Link
                  to={{
                    pathname: composeProgramDetailsUrl(signal.url),
                    state: `/ ${title}`
                  }}
                >
                  <GVButton variant="text" color="secondary">
                    {signal.title}
                  </GVButton>
                </Link>
              </div>
            </TableCell>
            <TableCell>
              {moment(signal.personalDetails.subscribeDate).format("lll")}
            </TableCell>
            <TableCell>{signal.subscribers}</TableCell>
            <TableCell>{signal.personalDetails.investorTrades}</TableCell>
            <TableCell>
              <Profitability
                value={+formatValue(signal.personalDetails.investorProfit)}
                prefix="sign"
              >
                <NumberFormat
                  value={formatPercent(signal.personalDetails.investorProfit)}
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" %"
                />
              </Profitability>
            </TableCell>
            <TableCell>
              <ProgramSimpleChart data={signal.chart} programId={signal.id} />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(DashboardCopytrading);
