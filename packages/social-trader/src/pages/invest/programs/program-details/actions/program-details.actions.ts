import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "components/details/reducers/statistic-period.reducer";
import { EVENTS_ACTION_TYPE } from "components/portfolio-events-table/portfolio-events-table.constants";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import followApi from "services/api-client/follow-api";
import platformApi from "services/api-client/platform-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import { ActionType, ApiAction, CurrencyEnum } from "utils/types";

import {
  FETCH_LEVEL_PARAMETERS,
  FETCH_PROGRAM_ABSOLUTE_PROFIT_CHART,
  FETCH_PROGRAM_BALANCE_CHART,
  FETCH_PROGRAM_DESCRIPTION,
  FETCH_PROGRAM_PROFIT_CHART,
  GET_PROGRAM_PERIOD_HISTORY,
  PROGRAM_FINANCIAL_STATISTIC,
  PROGRAM_OPEN_POSITIONS,
  PROGRAM_SUBSCRIPTIONS,
  PROGRAM_TRADES,
  SET_PROGRAM_ID,
  SET_PROGRAM_STATISTIC_CURRENCY,
  SET_PROGRAM_STATISTIC_PERIOD
} from "../program-details.constants";
import {
  EventsDataType,
  LevelParametersDataType,
  OpenTradesDataType,
  ProgramAbsoluteProfitChartDataType,
  ProgramBalanceChartDataType,
  ProgramDescriptionDataType,
  ProgramPeriodsDataType,
  ProgramProfitChartDataType,
  SignalProviderSubscribersDataType,
  TradesDataType
} from "../program-details.types";
import { ProgramIdState } from "../reducers/id.reducer";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "../service/program-details.service";

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
): ApiAction<EventsDataType> => ({
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
  payload: programsApi.getProgramProfitPercentCharts(id, {
    authorization: authService.getAuthArg(),
    dateFrom: period.start,
    dateTo: period.end,
    currencies
  })
});

export const fetchProgramAbsoluteProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<ProgramAbsoluteProfitChartDataType> => ({
  type: FETCH_PROGRAM_ABSOLUTE_PROFIT_CHART,
  payload: programsApi.getProgramAbsoluteProfitChart(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currency
  })
});

export const fetchProgramBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<ProgramBalanceChartDataType> => ({
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
): ApiAction<ProgramDescriptionDataType> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: programsApi.getProgramDetails(id, { authorization })
});

export const fetchFollowProgramDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<ProgramDescriptionDataType> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: followApi.getFollowAssetDetails(id, { authorization })
});

export const fetchLevelParametersAction = (
  currency: CurrencyEnum
): ApiAction<LevelParametersDataType> => ({
  type: FETCH_LEVEL_PARAMETERS,
  payload: platformApi.getProgramLevelsParams({ currency })
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<OpenTradesDataType> => ({
  type: PROGRAM_OPEN_POSITIONS,
  payload: programsApi.getProgramOpenTrades(id, filters)
});

export const fetchTradesAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<TradesDataType> => ({
  type: PROGRAM_TRADES,
  payload: programsApi.getAssetTrades(id, filters)
});

export const fetchPeriodHistoryAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<ProgramPeriodsDataType> => ({
  type: GET_PROGRAM_PERIOD_HISTORY,
  payload: programsApi.getProgramPeriods(id, filters)
});

export const fetchFinancialStatisticAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<ProgramPeriodsDataType> => ({
  type: PROGRAM_FINANCIAL_STATISTIC,
  payload: programsApi.getProgramPeriods(id, filters)
});

export const fetchSubscriptionsAction = (
  id: string,
  authorization: string,
  filters: ComposeFiltersAllType
): ApiAction<SignalProviderSubscribersDataType> => ({
  type: PROGRAM_SUBSCRIPTIONS,
  payload: programsApi.getProgramSubscribers(id, authorization, filters)
});

export interface SetProgramIdAction extends ActionType<ProgramIdState> {
  type: typeof SET_PROGRAM_ID;
}
export const setProgramIdAction = (id: string): SetProgramIdAction => ({
  type: SET_PROGRAM_ID,
  payload: id
});
