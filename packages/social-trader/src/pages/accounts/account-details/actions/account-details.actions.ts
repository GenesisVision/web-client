import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "components/details/reducers/statistic-period.reducer";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  AccountBalanceChart,
  TradesSignalViewModel,
  TradesViewModel
} from "gv-api-web";
import { AccountAbsoluteProfitChartDataType } from "pages/accounts/account-details/reducers/absolute-profit-chart.reducer";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { ActionType, ApiAction, CurrencyEnum } from "utils/types";

import {
  ACCOUNT_OPEN_POSITIONS,
  ACCOUNT_TRADES,
  FETCH_ACCOUNT_ABSOLUTE_PROFIT_CHART,
  FETCH_ACCOUNT_BALANCE_CHART,
  FETCH_ACCOUNT_DESCRIPTION,
  FETCH_ACCOUNT_PROFIT_CHART,
  SET_ACCOUNT_ID,
  SET_ACCOUNT_STATISTIC_CURRENCY,
  SET_ACCOUNT_STATISTIC_PERIOD
} from "../account-details.constants";
import { AccountDetailsDataType } from "../account-details.types";
import { AccountIdState } from "../reducers/id.reducer";
import { AccountProfitChartDataType } from "../reducers/profit-chart.reducer";

export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_ACCOUNT_STATISTIC_CURRENCY,
  payload: currency
});

export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_ACCOUNT_STATISTIC_PERIOD,
  payload: period
});

export const fetchAccountProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<AccountProfitChartDataType> => ({
  type: FETCH_ACCOUNT_PROFIT_CHART,
  payload: api.accounts().getProfitPercentCharts(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currencies
  })
});

export const fetchAccountAbsoluteProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<AccountAbsoluteProfitChartDataType> => ({
  type: FETCH_ACCOUNT_ABSOLUTE_PROFIT_CHART,
  payload: api.accounts().getAbsoluteProfitChart(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currency
  })
});

export const fetchAccountBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<AccountBalanceChart> => ({
  type: FETCH_ACCOUNT_BALANCE_CHART,
  payload: api.accounts().getBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchAccountDescriptionAction = (
  id: string,
  token?: Token
): ApiAction<AccountDetailsDataType> => ({
  type: FETCH_ACCOUNT_DESCRIPTION,
  payload: api.accounts(token).getTradingAccountDetails(id)
});

export const fetchOpenPositionsAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesViewModel>> => ({
  type: ACCOUNT_OPEN_POSITIONS,
  payload: api.accounts().getOpenTrades(id, filters)
});

export const fetchTradesAction = (
  id: string,
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesSignalViewModel>> => ({
  type: ACCOUNT_TRADES,
  payload: api.accounts().getTrades(id, filters)
});

export interface SetAccountIdAction extends ActionType<AccountIdState> {
  type: typeof SET_ACCOUNT_ID;
}
export const setAccountIdAction = (id: string): SetAccountIdAction => ({
  type: SET_ACCOUNT_ID,
  payload: id
});
