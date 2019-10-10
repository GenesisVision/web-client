import {
  CancelablePromise,
  InvestmentEventViewModels,
  LevelsParamsInfo,
  ProgramBalanceChart,
  ProgramDetailsFullOld,
  ProgramPeriodsViewModel,
  ProgramProfitChart,
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "shared/components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "shared/components/details/reducers/statistic-period.reducer";
import { EVENTS_ACTION_TYPE } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import { ActionType, ApiAction, CurrencyEnum } from "shared/utils/types";

import { ProgramProfitChartDataType } from "../reducers/profit-chart.reducer";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "../services/program-details.service";

export const SET_PROGRAM_STATISTIC_PERIOD = "SET_PROGRAM_STATISTIC_PERIOD";
export const SET_PROGRAM_STATISTIC_CURRENCY = "SET_PROGRAM_STATISTIC_CURRENCY";
export const FETCH_PROGRAM_PROFIT_CHART = "FETCH_PROGRAM_PROFIT_CHART";
export const FETCH_PROGRAM_BALANCE_CHART = "FETCH_PROGRAM_BALANCE_CHART";
export const FETCH_PROGRAM_DESCRIPTION = "FETCH_PROGRAM_DESCRIPTION";
export const FETCH_LEVEL_PARAMETERS = "FETCH_LEVEL_PARAMETERS";

export const PROGRAM_OPEN_POSITIONS = "PROGRAM_OPEN_POSITIONS";
export const PROGRAM_TRADES = "PROGRAM_TRADES";
export const PROGRAM_PERIOD_HISTORY = "PROGRAM_PERIOD_HISTORY";
export const PROGRAM_FINANCIAL_STATISTIC = "PROGRAM_FINANCIAL_STATISTIC";
export const PROGRAM_SUBSCRIPTIONS = "PROGRAM_SUBSCRIPTIONS";

const sendProgramChartRequest = (
  { start, end }: ChartDefaultPeriod,
  id: string,
  currency: CurrencyEnum
): CancelablePromise<ProgramProfitChart> =>
  programsApi.getProgramProfitChart(id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency
  });

export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_PROGRAM_STATISTIC_CURRENCY,
  payload: currency
});

export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_PROGRAM_STATISTIC_PERIOD,
  payload: period
});

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
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<ProgramProfitChartDataType> => ({
  type: FETCH_PROGRAM_PROFIT_CHART,
  payload: Promise.all(
    currencies.map(currency => sendProgramChartRequest(period, id, currency))
  ) as CancelablePromise<ProgramProfitChartDataType>
});

export const fetchProgramBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<ProgramBalanceChart> => ({
  type: FETCH_PROGRAM_BALANCE_CHART,
  payload: programsApi.getProgramBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchProgramDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<ProgramDetailsFullOld> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: programsApi.getProgramDetails(id, { authorization })
});

export const fetchLevelParametersAction = (
  currency: CurrencyEnum
): ApiAction<LevelsParamsInfo> => ({
  type: FETCH_LEVEL_PARAMETERS,
  payload: platformApi.getLevelsParams({ currency })
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: PROGRAM_OPEN_POSITIONS,
  payload: programsApi.getProgramOpenTrades(id, filters)
});

export const fetchTradesAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<TradesViewModel>> => ({
  type: PROGRAM_TRADES,
  payload: programsApi.getProgramTrades(id, filters)
});

export const fetchPeriodHistoryAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => ({
  type: PROGRAM_PERIOD_HISTORY,
  payload: programsApi.getProgramPeriods(id, filters)
});

export const fetchFinancialStatisticAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramPeriodsViewModel>> => ({
  type: PROGRAM_FINANCIAL_STATISTIC,
  payload: programsApi.getProgramPeriods(id, filters)
});

export const fetchSubscriptionsAction = (
  id: string,
  authorization: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalProviderSubscribers>> => ({
  type: PROGRAM_SUBSCRIPTIONS,
  payload: programsApi.getProgramSubscribers(id, authorization, filters)
});
