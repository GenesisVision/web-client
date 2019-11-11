import {
  FundBalanceChart,
  FundDetailsFull,
  ItemsViewModelReallocationModel
} from "gv-api-web";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "shared/components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "shared/components/details/reducers/statistic-period.reducer";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import fundsApi from "shared/services/api-client/funds-api";
import { ActionType, ApiAction, CurrencyEnum } from "shared/utils/types";

import {
  FETCH_FUND_BALANCE_CHART,
  FETCH_FUND_DESCRIPTION,
  FETCH_FUND_PROFIT_CHART,
  FUND_REALLOCATE_HISTORY,
  SET_FUND_ID,
  SET_FUND_STATISTIC_CURRENCY,
  SET_FUND_STATISTIC_PERIOD
} from "../fund-details.constants";
import { SetFundIdAction } from "../fund-details.types";
import { FundIdState } from "../reducers/id.reducer";
import { FundProfitChartDataType } from "../reducers/profit-chart.reducer";

export const fetchFundProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FundProfitChartDataType> => ({
  type: FETCH_FUND_PROFIT_CHART,
  payload: fundsApi.getFundProfitChart(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currencies
  })
});

export const fetchFundBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<FundBalanceChart> => ({
  type: FETCH_FUND_BALANCE_CHART,
  payload: fundsApi.getFundBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchFundDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<FundDetailsFull> => ({
  type: FETCH_FUND_DESCRIPTION,
  payload: fundsApi.getFundDetails(id) // TODO auth
});

export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_FUND_STATISTIC_CURRENCY,
  payload: currency
});

export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_FUND_STATISTIC_PERIOD,
  payload: period
});

export const fundReallocateHistoryAction = (
  id: string,
  filters?: FilteringType
): ApiAction<ItemsViewModelReallocationModel> => ({
  type: FUND_REALLOCATE_HISTORY,
  payload: fundsApi.getReallocatingHistory(id, filters)
});

export const setFundIdAction = (id: string): SetFundIdAction => ({
  type: SET_FUND_ID,
  payload: id
});
