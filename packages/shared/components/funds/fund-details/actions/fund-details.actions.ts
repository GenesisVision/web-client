import {
  CancelablePromise,
  FundAssetsListInfo,
  FundBalanceChart,
  FundDetailsFull,
  FundProfitChart,
  ReallocationsViewModel
} from "gv-api-web";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import fundsApi from "shared/services/api-client/funds-api";
import { ActionType, ApiAction, CurrencyEnum } from "shared/utils/types";

import { FundAssetsViewModel } from "../reducers/fund-details.reducer";
import { FundProfitChartDataType } from "../reducers/profit-chart.reducer";
import { StatisticCurrencyDataType } from "../reducers/statistic-currency.reducer";
import { StatisticPeriodDataType } from "../reducers/statistic-period.reducer";

export const SET_STATISTIC_PERIOD = "SET_STATISTIC_PERIOD";
export const SET_STATISTIC_CURRENCY = "SET_STATISTIC_CURRENCY";
export const FETCH_FUND_PROFIT_CHART = "FETCH_FUND_PROFIT_CHART";
export const FETCH_FUND_BALANCE_CHART = "FETCH_FUND_BALANCE_CHART";
export const FETCH_FUND_DESCRIPTION = "FETCH_FUND_DESCRIPTION";

export const FUND_REALLOCATE_HISTORY = "FUND_REALLOCATE_HISTORY";
export const FUND_STRUCTURE = "FUND_STRUCTURE";

const sendFundChartRequest = (
  { start, end }: ChartDefaultPeriod,
  id: string,
  currency: CurrencyEnum
): Promise<FundProfitChart> =>
  fundsApi.v10FundsByIdChartsProfitGet(id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency
  });

export const fetchFundProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FundProfitChartDataType> => ({
  type: FETCH_FUND_PROFIT_CHART,
  payload: Promise.all(
    currencies.map(currency => sendFundChartRequest(period, id, currency))
  ) as CancelablePromise<FundProfitChartDataType>
});

export const fetchFundBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<FundBalanceChart> => ({
  type: FETCH_FUND_BALANCE_CHART,
  payload: fundsApi.v10FundsByIdChartsBalanceGet(id, {
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
  payload: fundsApi.v10FundsByIdGet(id, { authorization })
});

export type TStatisticCurrencyAction = ActionType<StatisticCurrencyDataType>;
export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_STATISTIC_CURRENCY,
  payload: currency
});

export type TStatisticPeriodAction = ActionType<StatisticPeriodDataType>;
export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_STATISTIC_PERIOD,
  payload: period
});

export const fundReallocateHistoryAction = (
  fundId: string,
  filters?: FilteringType
): ApiAction<ReallocationsViewModel> => ({
  type: FUND_REALLOCATE_HISTORY,
  payload: fundsApi.v10FundsByIdReallocationsGet(fundId, filters)
});

export const fundStructureAction = (
  fundId: string
): ApiAction<FundAssetsViewModel> => ({
  type: FUND_STRUCTURE,
  payload: fundsApi
    .v10FundsByIdAssetsGet(fundId)
    .then(data => ({ ...data, total: data.assets.length }))
});
