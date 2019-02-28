import "./dashboard-funds.scss";

import { GVButton } from "gv-react-components";
import React, { Fragment, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { Action } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import Profitability from "shared/components/profitability/profitability";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { FUND } from "shared/constants/constants";
import { composeFundsDetailsUrl } from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import AssetStatus from "../../../asset-status/asset-status";
import {
  Column,
  IUpdateFilterFunc
} from "../../../table/components/table.types";
import { DASHBOARD_FUNDS_COLUMNS } from "../../dashboard.constants";
import dashboardFundsTableSelector from "./dashboard-funds.selector";

interface IDashboardFundsProps {
  title: string;
  role: string;
  getDashboardFunds(filters: any): Action;
  onChangeStatus?(): void;
  createButtonToolbar?(text: string, route: string): JSX.Element;
  createFund?(): void;
}

const DashboardFunds: FunctionComponent<
  InjectedTranslateProps & IDashboardFundsProps
> = ({
  t,
  role,
  onChangeStatus,
  getDashboardFunds,
  createButtonToolbar,
  createFund,
  title
}) => {
  return (
    <TableContainer
      createButtonToolbar={createButtonToolbar}
      emptyMessage={createFund}
      getItems={getDashboardFunds}
      dataSelector={dashboardFundsTableSelector}
      isFetchOnMount={true}
      columns={DASHBOARD_FUNDS_COLUMNS}
      renderFilters={(updateFilter: IUpdateFilterFunc, filtering: any) => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.fund-start")}
          />
        </Fragment>
      )}
      renderHeader={(column: Column) => (
        <span
          className={`funds-table__cell dashboard-funds__cell dashboard-funds__cell--${
            column.name
          }`}
        >
          {t(
            `${process.env.REACT_APP_PLATFORM}.dashboard-page.funds-header.${
              column.name
            }`
          )}
        </span>
      )}
      renderBodyRow={(fund: any) => (
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
            {formatCurrencyValue(fund.statistic.balanceGVT.amount, "GVT")} GVT
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
              value={formatCurrencyValue(fund.personalDetails.value, "GVT")}
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
            <Profitability
              value={formatValue(fund.statistic.profitPercent, 2)}
              prefix="sign"
            >
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
          <TableCell className="programs-table__cell dashboard-programs__cell--status">
            <AssetStatus
              status={fund.personalDetails.status}
              id={fund.id}
              role={role}
              asset={FUND}
              onCancel={onChangeStatus}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default translate()(DashboardFunds);
