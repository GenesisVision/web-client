import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "components/details/reducers/statistic-period.reducer";
import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  FundBalanceChart,
  FundDetailsFull,
  ItemsViewModelReallocationModel
} from "gv-api-web";
import { FundAbsoluteProfitChartDataType } from "pages/invest/funds/fund-details/reducers/absolute-profit-chart.reducer";
import fundsApi from "services/api-client/funds-api";
import { ApiAction, CurrencyEnum } from "utils/types";

import {
  FETCH_FUND_ABSOLUTE_PROFIT_CHART,
  FETCH_FUND_BALANCE_CHART,
  FETCH_FUND_DESCRIPTION,
  FETCH_FUND_PROFIT_CHART,
  FUND_REALLOCATE_HISTORY,
  SET_FUND_ID,
  SET_FUND_STATISTIC_CURRENCY,
  SET_FUND_STATISTIC_PERIOD
} from "../fund-details.constants";
import { SetFundIdAction } from "../fund-details.types";
import { FundProfitChartDataType } from "../reducers/profit-chart.reducer";

export const fetchFundProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FundProfitChartDataType> => ({
  type: FETCH_FUND_PROFIT_CHART,
  payload: fundsApi.getFundProfitPercentCharts(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currencies
  })
});

export const fetchFundAbsoluteProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<FundAbsoluteProfitChartDataType> => ({
  type: FETCH_FUND_ABSOLUTE_PROFIT_CHART,
  payload: fundsApi.getFundAbsoluteProfitChart(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currency
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
  authorization: string,
  currency: CurrencyEnum
): ApiAction<FundDetailsFull> => ({
  type: FETCH_FUND_DESCRIPTION,
  payload: fundsApi.getFundDetails(id, { authorization, currency }) // TODO auth
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
