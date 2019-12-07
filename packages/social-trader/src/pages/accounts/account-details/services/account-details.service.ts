import { getDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.helpers";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import { CancelablePromise, TradesViewModel } from "gv-api-web";
import { NextPageContext } from "next";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import brokersApi from "services/api-client/brokers-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import { ActionType, MiddlewareDispatch } from "utils/types";

import {
  fetchAccountAbsoluteProfitChartAction,
  fetchAccountBalanceChartAction,
  fetchAccountDescriptionAction,
  fetchAccountProfitChartAction,
  fetchOpenPositionsAction,
  fetchTradesAction,
  setAccountIdAction
} from "../actions/account-details.actions";
import { tradesTableSelector } from "../reducers/account-history.reducer";
import { AccountStatisticResult } from "./account-details.types";

export const getAccountBrokers = (id: string) =>
  brokersApi.getBrokersForProgram(id);

export const dispatchAccountDescription = (id: string) => (
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  return await dispatch(
    fetchAccountDescriptionAction(id, authService.getAuthArg(ctx))
  );
};

export const dispatchAccountId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setAccountIdAction(id));

export const getAccountStatistic = (
  accountId: string,
  currency = "",
  period = getDefaultPeriod()
): Promise<AccountStatisticResult> => {
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };
  // @ts-ignore
  return Promise.all([
    // @ts-ignore
    programsApi.getProgramProfitPercentCharts(accountId, chartFilter),
    // @ts-ignore
    programsApi.getProgramBalanceChart(accountId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    const statistic = {
      trades: profitChart.trades,
      successTradesPercent: profitChart.successTradesPercent,
      profitFactor: profitChart.profitFactor,
      investors: profitChart.investors,
      sharpeRatio: profitChart.sharpeRatio,
      sortinoRatio: profitChart.sortinoRatio,
      maxDrawdown: profitChart.maxDrawdown,
      periodStarts: profitChart.lastPeriodStarts,
      periodEnds: profitChart.lastPeriodEnds,
      tradingVolume: profitChart.tradingVolume
    };
    return { statistic, profitChart, balanceChart };
  });
};

export const getOpenPositions = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => {
  const authorization = authService.getAuthArg();
  return fetchOpenPositionsAction(id, filters, authorization);
};

export const getTrades = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => {
  const authorization = authService.getAuthArg();
  return fetchTradesAction(id, filters, authorization);
};

export const getAccountHistoryCounts = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const commonFiltering = { take: 0 };

  const tradesFilters = composeRequestFiltersByTableState(
    tradesTableSelector(getState())
  );
  dispatch(
    getTrades(id)({
      ...tradesFilters,
      ...commonFiltering
    })
  );
};

export enum EVENT_LOCATION {
  Asset = "Asset",
  Dashboard = "Dashboard",
  EventsAll = "EventsAll"
}

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(fetchAccountProfitChartAction(id, period, currencies));

export const getAbsoluteProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(
    fetchAccountAbsoluteProfitChartAction(id, period, currencies[0])
  );

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch => {
  await dispatch(fetchAccountBalanceChartAction(id, period, currencies[0]));
};
