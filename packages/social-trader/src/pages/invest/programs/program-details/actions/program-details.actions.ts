import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "components/details/reducers/statistic-period.reducer";
import { EVENTS_ACTION_TYPE } from "components/portfolio-events-table/portfolio-events-table.constants";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { ApiAction, CurrencyEnum } from "utils/types";

import {
  FETCH_PROGRAM_ABSOLUTE_PROFIT_CHART,
  FETCH_PROGRAM_BALANCE_CHART,
  FETCH_PROGRAM_DESCRIPTION,
  FETCH_PROGRAM_PROFIT_CHART,
  GET_PROGRAM_PERIOD_HISTORY,
  PROGRAM_FINANCIAL_STATISTIC,
  PROGRAM_OPEN_POSITIONS,
  PROGRAM_SUBSCRIPTIONS,
  PROGRAM_TRADES,
  SET_PROGRAM_STATISTIC_CURRENCY,
  SET_PROGRAM_STATISTIC_PERIOD
} from "../program-details.constants";
import {
  EventsDataType,
  OpenTradesDataType,
  ProgramAbsoluteProfitChartDataType,
  ProgramBalanceChartDataType,
  ProgramDescriptionDataType,
  ProgramPeriodsDataType,
  ProgramProfitChartDataType,
  SignalProviderSubscribersDataType,
  TradesDataType
} from "../program-details.types";
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
  payload: api.programs().getProgramProfitPercentCharts(id, {
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
  payload: api.programs().getProgramAbsoluteProfitChart(id, {
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
  payload: api.programs().getProgramBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchProgramDescriptionAction = (
  id: string,
  token?: Token
): ApiAction<ProgramDescriptionDataType> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: api.programs(token).getProgramDetails(id)
});

export const fetchFollowProgramDescriptionAction = (
  id: string,
  token?: Token
): ApiAction<ProgramDescriptionDataType> => ({
  type: FETCH_PROGRAM_DESCRIPTION,
  payload: api.follows(token).getFollowAssetDetails(id)
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<OpenTradesDataType> => ({
  type: PROGRAM_OPEN_POSITIONS,
  payload: api.programs().getProgramOpenTrades(id, filters)
});

export const fetchTradesAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<TradesDataType> => ({
  type: PROGRAM_TRADES,
  payload: api.programs().getAssetTrades(id, filters)
});

export const fetchPeriodHistoryAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<ProgramPeriodsDataType> => ({
  type: GET_PROGRAM_PERIOD_HISTORY,
  payload: api.programs().getProgramPeriods(id, filters)
});

export const fetchFinancialStatisticAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<ProgramPeriodsDataType> => ({
  type: PROGRAM_FINANCIAL_STATISTIC,
  payload: api.programs().getProgramPeriods(id, filters)
});

export const fetchSubscriptionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ApiAction<SignalProviderSubscribersDataType> => ({
  type: PROGRAM_SUBSCRIPTIONS,
  payload: api.programs().getProgramSubscribers(id, filters)
});
