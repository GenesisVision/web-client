import "./dashboard-funds.scss";

import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import Profitability from "components/profitability/profitability";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVButton } from "gv-react-components";
import { FUNDS_TABLE_COLUMNS } from "modules/funds-table/funds-table.constants";
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

import FundAssetContainer from "../../../../../modules/funds-table/components/funds-table/fund-asset/fund-asset-container";
import replaceParams from "../../../../../utils/replace-params";
import {
  FUNDS_SLUG_URL_PARAM_NAME,
  FUND_DETAILS_ROUTE
} from "../../../../funds/funds.routes";
import { DASHBOARD_PROGRAMS_SORTING } from "../../../dashboard.constants";
import { getDashboardFunds } from "../../../services/dashboard-funds.service";

class DashboardFunds extends Component {
  fetchFunds = filters => {
    return getDashboardFunds().then(({ data }) => {
      return { items: data.funds, total: data.total };
    });
  };

  render() {
    const fundDetailsUrl = fundUrl =>
      replaceParams(FUND_DETAILS_ROUTE, {
        [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: fundUrl
      });
    const { t } = this.props;
    return (
      <TableModule
        paging={DEFAULT_PAGING}
        sorting={DASHBOARD_PROGRAMS_SORTING}
        filtering={{
          dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
        }}
        getItems={this.fetchFunds}
        columns={FUNDS_TABLE_COLUMNS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.fund-start-label")}
            />
          </Fragment>
        )}
        renderHeader={column => (
          <span className={`dashboard-funds__cell--${column.name}`}>
            {t(`dashboard-page.funds-header.${column.name}`)}
          </span>
        )}
        renderBodyRow={fund => (
          <TableRow>
            <TableCell className="funds-table__cell--name">
              <div className="funds-table__cell--avatar-title">
                <AssetAvatar url={fund.logo} alt={fund.title} />
                <div className="funds-table__cell--title">
                  <Link to={fundDetailsUrl(fund.url)}>
                    <GVButton variant="text" color="secondary">
                      {fund.title}
                    </GVButton>
                  </Link>
                </div>
              </div>
            </TableCell>
            <TableCell className="funds-table__cell">
              {fund.statistic.balanceGVT.amount} GVT
            </TableCell>
            <TableCell className="funds-table__cell">
              <FundAssetContainer
                assets={fund.topFundAssets}
                type={"short"}
                size={3}
                length={fund.totalAssetsCount}
              />
            </TableCell>
            <TableCell className="funds-table__cell--investors">
              {fund.statistic.investorsCount}
            </TableCell>
            <TableCell className="funds-table__cell--drawdown">
              <NumberFormat
                value={fund.statistic.drawdownPercent}
                suffix="%"
                decimalScale={2}
                displayType="text"
              />
            </TableCell>
            <TableCell className="funds-table__cell--profit">
              <Profitability value={fund.statistic.profitPercent} prefix="sign">
                <NumberFormat
                  value={fund.statistic.profitPercent}
                  suffix="%"
                  allowNegative={false}
                  decimalScale={2}
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="funds-table__cell--chart">
              <ProgramSimpleChart data={fund.chart} programId={fund.id} />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(DashboardFunds);
