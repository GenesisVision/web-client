import {
  CancelablePromise,
  Currency,
  InvestmentEventViewModels,
  LevelInfo,
  ProgramPeriodsViewModel,
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import { NextPageContext } from "next";
import { Dispatch } from "redux";
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
import assetsApi from "shared/services/api-client/assets-api";
import brokersApi from "shared/services/api-client/brokers-api";
import eventsApi from "shared/services/api-client/events-api";
import platformApi from "shared/services/api-client/platform-api";
import authService from "shared/services/auth-service";
import {
  ActionType,
  CurrencyEnum,
  MiddlewareDispatch,
  TGetState
} from "shared/utils/types";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

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

export const getEvents = (id: string, eventLocation: EVENT_LOCATION) => (
  filters?: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> =>
  fetchEventsAction(id, eventLocation, filters);

export const getProgramBrokersMethod = (id: string) =>
  brokersApi.getBrokersForProgram(id);

export const dispatchPlatformLevelsParameters = (currency: CurrencyEnum) => (
  dispatch: Dispatch
) => dispatch(fetchLevelParametersAction(currency));

export const dispatchProgramDescriptionWithId = (
  id: string,
  auth = authService.getAuthArg()
) => async (dispatch: Dispatch) =>
  await dispatch(fetchProgramDescriptionAction(id, auth));

export const dispatchProgramDescription = (ctx?: NextPageContext) => async (
  dispatch: MiddlewareDispatch,
  getState: TGetState
) => {
  const {
    programDetails: { id: stateId }
  } = getState();
  return await dispatch(
    dispatchProgramDescriptionWithId(
      ctx ? (ctx.query.id as string) : stateId,
      authService.getAuthArg(ctx)
    )
  );
};

export const dispatchProgramId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setProgramIdAction(id));

export const closePeriod = (
  programId: string,
  onSuccess: () => void,
  onError: () => void
) => (dispatch: Dispatch): void => {
  const authorization = authService.getAuthArg();
  assetsApi
    .closeCurrentPeriod(programId, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.close-period.notification-success",
          true
        )
      );
    })
    .catch((error: { errorMessage: string }) => {
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
  currency: Currency
): CancelablePromise<LevelInfo[]> =>
  platformApi.getProgramLevels({ currency }).then(({ levels }) => levels);

export const getProgramHistoryCounts = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const isAuthenticated = authService.isAuthenticated();
  const isManager = ROLE_ENV || ROLE.MANAGER === ROLE.MANAGER; // TODO remove after union

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
  return eventsApi.getEvents(authorization, { ...filters, eventLocation });
};

export const fetchPortfolioEvents = (
  eventLocation: EVENT_LOCATION
): GetItemsFuncType => (
  filters?
): CancelablePromise<TableItems<InvestmentEventViewModels>> => {
  const authorization = authService.getAuthArg();
  return eventsApi
    .getEvents(authorization, { ...filters, eventLocation })
    .then(mapToTableItems<InvestmentEventViewModels>("events"));
};

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(fetchProgramProfitChartAction(id, period, currencies));

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch => {
  await dispatch(fetchProgramBalanceChartAction(id, period, currencies[0]));
};
