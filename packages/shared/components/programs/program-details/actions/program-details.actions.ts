import {
  CancelablePromise,
  InvestmentEventViewModels,
  LevelsParamsInfo,
  ProgramBalanceChart,
  ProgramDetailsFull,
  ProgramPeriodsViewModel,
  ProgramProfitChart,
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import { getDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { EVENTS_ACTION_TYPE } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import { ActionType, ApiAction, CurrencyEnum } from "shared/utils/types";

import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "../services/program-details.service";

export const FETCH_PROGRAM_PROFIT_CHART = "FETCH_PROGRAM_PROFIT_CHART";
export const FETCH_PROGRAM_BALANCE_CHART = "FETCH_PROGRAM_BALANCE_CHART";
export const FETCH_PROGRAM_DESCRIPTION = "FETCH_PROGRAM_DESCRIPTION";
export const FETCH_LEVEL_PARAMETERS = "FETCH_LEVEL_PARAMETERS";

export const PROGRAM_OPEN_POSITIONS = "PROGRAM_OPEN_POSITIONS";
export const PROGRAM_TRADES = "PROGRAM_TRADES";
export const PROGRAM_PERIOD_HISTORY = "PROGRAM_PERIOD_HISTORY";
export const PROGRAM_FINANCIAL_STATISTIC = "PROGRAM_FINANCIAL_STATISTIC";
export const PROGRAM_SUBSCRIPTIONS = "PROGRAM_SUBSCRIPTIONS";

export const fetchEventsAction = (
  assetId: string,
  eventLocation: EVENT_LOCATION,
  filters?: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> => ({
  type: EVENTS_ACTION_TYPE,
  payload: fetchPortfolioEventsWithoutTable(eventLocation, {
    ...filters,
    assetId
  })
});

export const fetchProgramProfitChartAction = (
  id: string,
  period = getDefaultPeriod()
): ApiAction<ProgramProfitChart> => ({
  type: FETCH_PROGRAM_PROFIT_CHART,
  payload: programsApi.v10ProgramsByIdChartsProfitGet(id, {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchProgramBalanceChartAction = (
  id: string,
  period = getDefaultPeriod()
): ApiAction<ProgramBalanceChart> => ({
  type: FETCH_PROGRAM_BALANCE_CHART,
  payload: programsApi.v10ProgramsByIdChartsBalanceGet(id, {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchProgramDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<ProgramDetailsFull> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: programsApi.v10ProgramsByIdGet(id, { authorization })
});

export const fetchLevelParametersAction = (
  currency: CurrencyEnum
): ApiAction<LevelsParamsInfo> => ({
  type: FETCH_LEVEL_PARAMETERS,
  payload: platformApi.v10PlatformLevelsParametersGet({ currency })
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: PROGRAM_OPEN_POSITIONS,
  payload: programsApi.v10ProgramsByIdTradesOpenGet(id, filters)
});

export const fetchTradesAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: PROGRAM_TRADES,
  payload: programsApi.v10ProgramsByIdTradesGet(id, filters)
});

export const fetchPeriodHistoryAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => ({
  type: PROGRAM_PERIOD_HISTORY,
  payload: programsApi.v10ProgramsByIdPeriodsGet(id, filters)
});

export const fetchFinancialStatisticAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => ({
  type: PROGRAM_FINANCIAL_STATISTIC,
  payload: programsApi.v10ProgramsByIdPeriodsGet(id, filters)
});

export const fetchSubscriptionsAction = (
  id: string,
  authorization: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalProviderSubscribers>> => ({
  type: PROGRAM_SUBSCRIPTIONS,
  payload: programsApi.v10ProgramsByIdSubscribersGet(id, authorization, filters)
});
