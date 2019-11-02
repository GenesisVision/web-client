import {
  CancelablePromise,
  InvestmentEventViewModels,
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import { NextPageContext } from "next";
import { Dispatch } from "redux";
import { getDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { TGetChartFunc } from "shared/components/details/details-statistic-section/details.chart.helpers";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import {
  mapToTableItems,
  TableItems
} from "shared/components/table/helpers/mapper";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { RootState } from "shared/reducers/root-reducer";
import brokersApi from "shared/services/api-client/brokers-api";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import { ActionType, MiddlewareDispatch } from "shared/utils/types";

import {
  fetchEventsAction,
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
): ActionType<CancelablePromise<InvestmentEventViewModels>> =>
  fetchEventsAction(id, eventLocation, filters);

export const getFollowBrokers = (id: string) =>
  brokersApi.getBrokersForProgram(id);

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
    programsApi.getProgramProfitChart(followId, chartFilter),
    programsApi.getProgramBalanceChart(followId, chartFilter)
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

export const closePeriod = (
  followId: string,
  onSuccess: () => void,
  onError: () => void
) => (dispatch: Dispatch): void => {
  const authorization = authService.getAuthArg();
  managerApi
    .closeCurrentPeriod(followId, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.close-period.notification-success",
          true
        )
      );
    })
    .catch(error => {
      onError();
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const getOpenPositions = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => {
  return fetchOpenPositionsAction(id, filters);
};

export const getTrades = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => {
  return fetchTradesAction(id, filters);
};

export const getSubscriptions = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalProviderSubscribers>> => {
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
): CancelablePromise<InvestmentEventViewModels> => {
  const authorization = authService.getAuthArg();
  let request: (
    authorization: string,
    opts?: Object
  ) => CancelablePromise<InvestmentEventViewModels>;
  switch (
    ROLE_ENV || ROLE.MANAGER // TODO remove after union
  ) {
    case ROLE.INVESTOR:
      request = investorApi.getEvents;
      break;
    case ROLE.MANAGER:
    default:
      request = managerApi.getEvents;
      break;
  }
  return request(authorization, { ...filters, eventLocation });
};

export const fetchPortfolioEvents = (
  eventLocation: EVENT_LOCATION
): GetItemsFuncType => (
  filters?
): CancelablePromise<TableItems<InvestmentEventViewModels>> => {
  const authorization = authService.getAuthArg();
  let request: (
    authorization: string,
    opts?: Object
  ) => CancelablePromise<InvestmentEventViewModels>;
  switch (
    ROLE_ENV || ROLE.MANAGER // TODO remove after union
  ) {
    case ROLE.INVESTOR:
      request = investorApi.getEvents;
      break;
    case ROLE.MANAGER:
    default:
      request = managerApi.getEvents;
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

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch => {
  await dispatch(fetchFollowBalanceChartAction(id, period, currencies[0]));
};
