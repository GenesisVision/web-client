import { getDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "components/table/components/table.types";
import { mapToTableItems, TableItems } from "components/table/helpers/mapper";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import { ROLE, ROLE_ENV } from "constants/constants";
import {
  InvestmentEventViewModels,
  SignalProviderSubscribers,
  TradesSignalViewModel,
  TradesViewModel
} from "gv-api-web";
import { NextPageContext } from "next";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import brokersApi from "services/api-client/brokers-api";
import followApi from "services/api-client/follow-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import { ActionType, MiddlewareDispatch } from "utils/types";

import {
  fetchEventsAction,
  fetchFollowAbsoluteProfitChartAction,
  fetchFollowBalanceChartAction,
  fetchFollowDescriptionAction,
  fetchFollowProfitChartAction,
  fetchOpenPositionsAction,
  fetchSubscriptionsAction,
  fetchTradesAction,
  setFollowIdAction
} from "../actions/follow-details.actions";
import {
  subscriptionsTableSelector,
  tradesTableSelector
} from "../reducers/follow-history.reducer";
import { FollowStatisticResult } from "./follow-details.types";

export const getEvents = (id: string, eventLocation: EVENT_LOCATION) => (
  filters?: ComposeFiltersAllType
): ActionType<Promise<InvestmentEventViewModels>> =>
  fetchEventsAction(id, eventLocation, filters);

export const getFollowBrokers = (id: string) =>
  brokersApi.getBrokersForProgram(id);

export const fetchFollowDescriptionCtx = (id: string, ctx?: NextPageContext) =>
  followApi.getFollowAssetDetails(id, {
    authorization: authService.getAuthArg(ctx)
  });

export const dispatchFollowDescription = (id: string) => (
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  return await dispatch(
    fetchFollowDescriptionAction(id, authService.getAuthArg(ctx))
  );
};

export const dispatchFollowId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setFollowIdAction(id));

export const getFollowStatistic = (
  followId: string,
  currency = "",
  period = getDefaultPeriod()
): Promise<FollowStatisticResult> => {
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };
  // @ts-ignore
  return Promise.all([
    // @ts-ignore
    programsApi.getProgramProfitPercentCharts(followId, chartFilter),
    // @ts-ignore
    programsApi.getProgramBalanceChart(followId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    //@ts-ignore
    const statistic = {
      //@ts-ignore
      trades: profitChart.trades,
      //@ts-ignore
      successTradesPercent: profitChart.successTradesPercent,
      //@ts-ignore
      profitFactor: profitChart.profitFactor,
      //@ts-ignore
      investors: profitChart.investors,
      //@ts-ignore
      sharpeRatio: profitChart.sharpeRatio,
      //@ts-ignore
      sortinoRatio: profitChart.sortinoRatio,
      //@ts-ignore
      maxDrawdown: profitChart.maxDrawdown,
      //@ts-ignore
      periodStarts: profitChart.lastPeriodStarts,
      //@ts-ignore
      periodEnds: profitChart.lastPeriodEnds,
      //@ts-ignore
      tradingVolume: profitChart.tradingVolume
    };
    return { statistic, profitChart, balanceChart };
  });
};

export const getOpenPositions = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesViewModel>> => {
  return fetchOpenPositionsAction(id, filters);
};

export const getTrades = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesSignalViewModel>> => {
  return fetchTradesAction(id, filters);
};

export const getSubscriptions = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<SignalProviderSubscribers>> => {
  const authorization = authService.getAuthArg();
  return fetchSubscriptionsAction(id, authorization, filters);
};

export const getFollowHistoryCounts = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const isAuthenticated = authService.isAuthenticated();

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

  if (isAuthenticated) {
    const subscriptionFilters = composeRequestFiltersByTableState(
      subscriptionsTableSelector(getState())
    );
    dispatch(
      getSubscriptions(id)({
        ...subscriptionFilters,
        ...commonFiltering
      })
    );
  }
};

export enum EVENT_LOCATION {
  Asset = "Asset",
  Dashboard = "Dashboard",
  EventsAll = "EventsAll"
}

export const fetchPortfolioEventsWithoutTable = (
  eventLocation: EVENT_LOCATION,
  filters?: any
): Promise<InvestmentEventViewModels> => {
  const authorization = authService.getAuthArg();
  let request: (
    authorization: string,
    opts?: Object
  ) => Promise<InvestmentEventViewModels>;
  switch (
    ROLE_ENV || ROLE.MANAGER // TODO remove after union
  ) {
    case ROLE.INVESTOR:
      request = () => new Promise<InvestmentEventViewModels>(() => {}); //TODO investorApi.getEvents;
      break;
    case ROLE.MANAGER:
    default:
      request = () => new Promise<InvestmentEventViewModels>(() => {}); //TODO managerApi.getEvents;
      break;
  }
  return request(authorization, { ...filters, eventLocation });
};

export const fetchPortfolioEvents = (
  eventLocation: EVENT_LOCATION
): GetItemsFuncType => (
  filters?
): Promise<TableItems<InvestmentEventViewModels>> => {
  const authorization = authService.getAuthArg();
  let request: (
    authorization: string,
    opts?: Object
  ) => Promise<InvestmentEventViewModels>;
  switch (
    ROLE_ENV || ROLE.MANAGER // TODO remove after union
  ) {
    case ROLE.INVESTOR:
      request = () => new Promise<InvestmentEventViewModels>(() => {}); // TODO investorApi.getEvents;
      break;
    case ROLE.MANAGER:
    default:
      request = () => new Promise<InvestmentEventViewModels>(() => {}); // TODO managerApi.getEvents;
      break;
  }
  return request(authorization, { ...filters, eventLocation }).then(
    mapToTableItems<InvestmentEventViewModels>("events")
  );
};

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(fetchFollowProfitChartAction(id, period, currencies));

export const getAbsoluteProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(
    fetchFollowAbsoluteProfitChartAction(id, period, currencies[0])
  );

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch => {
  await dispatch(fetchFollowBalanceChartAction(id, period, currencies[0]));
};
