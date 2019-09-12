import {
  CancelablePromise,
  InvestmentEventViewModels,
  LevelInfo,
  ProgramPeriodsViewModel,
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
import brokersApi from "shared/services/api-client/brokers-api";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import {
  ActionType,
  CurrencyEnum,
  DispatchDescriptionType,
  MiddlewareDispatch,
  TGetState
} from "shared/utils/types";

import { RootState } from "../../../../reducers/root-reducer";
import {
  fetchEventsAction,
  fetchFinancialStatisticAction,
  fetchLevelParametersAction,
  fetchOpenPositionsAction,
  fetchPeriodHistoryAction,
  fetchProgramBalanceChartAction,
  fetchProgramDescriptionAction,
  fetchProgramProfitChartAction,
  fetchSubscriptionsAction,
  fetchTradesAction,
  setProgramIdAction
} from "../actions/program-details.actions";
import {
  financialStatisticTableSelector,
  periodHistoryTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "../reducers/program-history.reducer";
import { ProgramStatisticResult } from "./program-details.types";

export const getEvents = (id: string, eventLocation: EVENT_LOCATION) => (
  filters?: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> =>
  fetchEventsAction(id, eventLocation, filters);

export const getProgramBrokers = (id: string) =>
  brokersApi.v10BrokersByProgramIdGet(id);

export const dispatchPlatformLevelsParameters = (currency: CurrencyEnum) => (
  dispatch: Dispatch
) => dispatch(fetchLevelParametersAction(currency));

export const dispatchProgramDescription = (ctx?: NextPageContext) => async (
  dispatch: MiddlewareDispatch,
  getState: TGetState
) => {
  const {
    programDetails: { id: stateId }
  } = getState();
  return await dispatch(
    fetchProgramDescriptionAction(
      ctx ? (ctx.query.id as string) : stateId,
      authService.getAuthArg(ctx)
    )
  );
};

export const dispatchProgramId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setProgramIdAction(id));

export const getProgramStatistic = (
  programId: string,
  currency = "",
  period = getDefaultPeriod()
): Promise<ProgramStatisticResult> => {
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };
  return Promise.all([
    programsApi.v10ProgramsByIdChartsProfitGet(programId, chartFilter),
    programsApi.v10ProgramsByIdChartsBalanceGet(programId, chartFilter)
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
  programId: string,
  onSuccess: () => void,
  onError: () => void
) => (dispatch: Dispatch): void => {
  const authorization = authService.getAuthArg();
  managerApi
    .v10ManagerProgramsByIdPeriodClosePost(programId, authorization)
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

export const getOpenPositions = (programId: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => {
  return fetchOpenPositionsAction(programId, filters);
};

export const getTrades = (programId: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => {
  return fetchTradesAction(programId, filters);
};

export const getPeriodHistory = (programId: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => {
  const authorization = authService.getAuthArg();
  return fetchPeriodHistoryAction(programId, { authorization, ...filters });
};

export const getFinancialStatistics = (programId: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => {
  const authorization = authService.getAuthArg();
  return fetchFinancialStatisticAction(programId, {
    authorization,
    ...filters
  });
};

export const getSubscriptions = (programId: string) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalProviderSubscribers>> => {
  const authorization = authService.getAuthArg();
  return fetchSubscriptionsAction(programId, authorization, filters);
};

export const fetchInvestmentsLevels = (
  currency: string
): Promise<LevelInfo[]> =>
  platformApi.v10PlatformLevelsGet({ currency }).then(({ levels }) => levels);

export const getProgramHistoryCounts = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const isAuthenticated = authService.isAuthenticated();
  const isManager = ROLE_ENV === ROLE.MANAGER;

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

  const periodHistoryFilters = composeRequestFiltersByTableState(
    periodHistoryTableSelector(getState())
  );
  dispatch(
    getPeriodHistory(id)({
      ...periodHistoryFilters,
      ...commonFiltering
    })
  );

  if (isAuthenticated && isManager) {
    const subscriptionFilters = composeRequestFiltersByTableState(
      subscriptionsTableSelector(getState())
    );
    dispatch(
      getSubscriptions(id)({
        ...subscriptionFilters,
        ...commonFiltering
      })
    );

    const financialStatisticsFilters = composeRequestFiltersByTableState(
      financialStatisticTableSelector(getState())
    );
    dispatch(
      getFinancialStatistics(id)({
        ...financialStatisticsFilters,
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
  switch (ROLE_ENV) {
    case ROLE.INVESTOR:
      request = investorApi.v10InvestorInvestmentsEventsGet;
      break;
    case ROLE.MANAGER:
    default:
      request = managerApi.v10ManagerInvestmentsEventsGet;
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
  switch (ROLE_ENV) {
    case ROLE.INVESTOR:
      request = investorApi.v10InvestorInvestmentsEventsGet;
      break;
    case ROLE.MANAGER:
    default:
      request = managerApi.v10ManagerInvestmentsEventsGet;
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
}) => dispatch =>
  await dispatch(fetchProgramProfitChartAction(id, period, currencies));

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => dispatch => {
  await dispatch(fetchProgramBalanceChartAction(id, period, currencies[0]));
};
