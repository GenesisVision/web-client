import "./dashboard-funds.scss";

import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { GVButton } from "gv-react-components";

import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import Profitability from "shared/components/profitability/profitability";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import { composeFundsDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

import dashboardFundsTableSelector from "./dashboard-funds.selector";

class DashboardFunds extends Component {
  render() {
    const {
      t,
      DASHBOARD_FUNDS_COLUMNS,
      getDashboardFunds,
      createButtonToolbar,
      createButtonBody,
      createText,
      title
    } = this.props;
    return (
      <TableContainer
        createButtonToolbar={createButtonToolbar}
        createButtonBody={createButtonBody}
        createText={createText}
        getItems={getDashboardFunds}
        dataSelector={dashboardFundsTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_FUNDS_COLUMNS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.fund-start")}
            />
          </Fragment>
        )}
        renderHeader={column => (
          <span
            className={`funds-table__cell dashboard-funds__cell dashboard-funds__cell--${
              column.name
            }`}
          >
            {t(`dashboard-page.funds-header.${column.name}`)}
          </span>
        )}
        renderBodyRow={fund => (
          <TableRow>
            <TableCell className="funds-table__cell funds-table__cell--name">
              <div className="funds-table__cell--avatar-title">
                <Link
                  to={{
                    pathname: composeFundsDetailsUrl(fund.url),
                    state: `/ ${title}`
                  }}
                >
                  <AssetAvatar
                    url={fund.logo}
                    alt={fund.title}
                    color={fund.color}
                  />
                </Link>
                <div className="funds-table__cell--title">
                  <Link
                    to={{
                      pathname: composeFundsDetailsUrl(fund.url),
                      state: `/ ${title}`
                    }}
                  >
                    <GVButton variant="text" color="secondary">
                      {fund.title}
                    </GVButton>
                  </Link>
                </div>
              </div>
            </TableCell>
            <TableCell className="funds-table__cell funds-table__cell--amount">
              {formatValue(fund.statistic.balanceGVT.amount)} GVT
            </TableCell>
            <TableCell className="funds-table__cell">
              <FundAssetContainer
                assets={fund.topFundAssets}
                type={"short"}
                size={3}
                length={fund.totalAssetsCount}
              />
            </TableCell>
            <TableCell className="funds-table__cell funds-table__cell--value">
              <NumberFormat
                value={formatValue(fund.personalDetails.value, 4)}
                suffix=" GVT"
                displayType="text"
              />
            </TableCell>
            <TableCell className="funds-table__cell funds-table__cell--drawdown">
              <NumberFormat
                value={formatValue(fund.statistic.drawdownPercent, 2)}
                suffix="%"
                displayType="text"
              />
            </TableCell>
            <TableCell className="funds-table__cell funds-table__cell--profit">
              <Profitability value={fund.statistic.profitPercent} prefix="sign">
                <NumberFormat
                  value={formatValue(fund.statistic.profitPercent, 2)}
                  suffix="%"
                  allowNegative={false}
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="funds-table__cell funds-table__cell--chart">
              <ProgramSimpleChart data={fund.chart} programId={fund.id} />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(DashboardFunds);
