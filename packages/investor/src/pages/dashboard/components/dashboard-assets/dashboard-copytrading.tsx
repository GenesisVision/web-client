import { SignalDetails } from "gv-api-web";
import { GVButton } from "gv-react-components";
import moment from "moment";
import { getDashboardCopytrading } from "pages/dashboard/services/dashboard-assets.service";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import Status from "shared/components/status/status";
import { TableCell } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import {
  Column,
  IUpdateFilterFunc
} from "shared/components/table/components/table.types";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatPercent } from "shared/utils/formatter";

import { DASHBOARD_COPYTRADING_COLUMNS } from "./dashboard-copytrading.constants";
import { dashboardCopytradingTableSelector } from "./dashboard-copytrading.selectors";

class _DashboardCopytrading extends React.Component<
  Props & InjectedTranslateProps
> {
  render() {
    const { t, title } = this.props;
    return (
      <TableContainer
        getItems={getDashboardCopytrading}
        dataSelector={dashboardCopytradingTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_COPYTRADING_COLUMNS}
        renderFilters={(
          updateFilter: IUpdateFilterFunc,
          filtering: FilteringType
        ) => (
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
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
            <TableCell>{signal.currency}</TableCell>
            <TableCell>{signal.personalDetails.tradesCount}</TableCell>
            <TableCell>
              {moment(signal.personalDetails.subscriptionDate).format("lll")}
            </TableCell>
            <TableCell>
              {/*<Profitability
                value={+formatPercent(signal.personalDetails.investorProfit)}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                <NumberFormat
                  value={formatPercent(signal.personalDetails.investorProfit)}
                  thousandSeparator=" "
                  allowNegative={false}
                  displayType="text"
                  suffix=" %"
                />
              </Profitability>*/}
            </TableCell>
            <TableCell>
              {signal.chart.length && (
                <ProgramSimpleChart data={signal.chart} programId={signal.id} />
              )}
            </TableCell>
            <TableCell>{signal.status}</TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const DashboardCopytrading = translate()(_DashboardCopytrading);
export default DashboardCopytrading;

interface Props {
  title: string;
}
