import "./dashboard-funds.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetStatus from "shared/components/asset-status/asset-status";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import GVButton from "shared/components/gv-button";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import {
  Column,
  GetItemsFuncActionType,
  UpdateFilterFunc
} from "shared/components/table/components/table.types";
import { FUND, FUND_CURRENCY } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";
import { fundListLoaderData } from "shared/modules/funds-table/components/funds-table/fund-table.loader-data";
import { composeFundsDetailsUrl } from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import { DASHBOARD_FUNDS_COLUMNS } from "../../dashboard.constants";
import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "../dashboard-programs/dashboard-programs.helpers";
import dashboardFundsTableSelector from "./dashboard-funds.selector";

const _DashboardFunds: React.FC<Props> = ({
  onChangeStatus,
  getDashboardFunds,
  createButtonToolbar,
  createFund,
  title
}) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <TableContainer
      loaderData={fundListLoaderData}
      createButtonToolbar={createButtonToolbar}
      emptyMessage={createFund}
      getItems={getDashboardFunds}
      dataSelector={dashboardFundsTableSelector}
      isFetchOnMount={true}
      columns={DASHBOARD_FUNDS_COLUMNS}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <>
          <SelectFilter
            name={ACTION_STATUS_FILTER_NAME}
            label={t(`${role}.dashboard-page.actions-status-filter.label`)}
            value={filtering[ACTION_STATUS_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={ACTION_STATUS_FILTER_VALUES}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.fund-start")}
          />
        </>
      )}
      renderHeader={(column: Column) => (
        <span
          className={`funds-table__cell dashboard-funds__cell dashboard-funds__cell--${column.name}`}
        >
          {t(`${role}.dashboard-page.funds-header.${column.name}`)}
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
            {formatCurrencyValue(fund.statistic.balance.amount, FUND_CURRENCY)}{" "}
            {FUND_CURRENCY}
          </TableCell>
          <TableCell className="funds-table__cell">
            <FundAssetContainer
              assets={fund.topFundAssets}
              type={FUND_ASSET_TYPE.SHORT}
              size={3}
              length={fund.totalAssetsCount} //TODO why we have totalAssetsCount prop?..
            />
          </TableCell>
          <TableCell className="funds-table__cell funds-table__cell--value">
            <NumberFormat
              value={formatCurrencyValue(
                fund.personalDetails.value,
                FUND_CURRENCY
              )}
              suffix={` ${FUND_CURRENCY}`}
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
              prefix={PROFITABILITY_PREFIX.SIGN}
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
            {fund.chart.length && (
              <ProgramSimpleChart data={fund.chart} programId={fund.id} />
            )}
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--status">
            <AssetStatus
              status={fund.personalDetails.status}
              id={fund.id}
              asset={FUND}
              onCancel={onChangeStatus}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

interface Props {
  title: string;
  getDashboardFunds: GetItemsFuncActionType;
  onChangeStatus?(): void;
  createButtonToolbar: JSX.Element;
  createFund: JSX.Element;
}

const DashboardFunds = React.memo(_DashboardFunds);
export default DashboardFunds;
