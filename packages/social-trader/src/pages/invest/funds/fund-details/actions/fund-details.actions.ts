import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "components/details/reducers/statistic-period.reducer";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { TableItems } from "components/table/helpers/mapper";
import {
  FundBalanceChart,
  FundDetailsFull,
  ReallocationModelItemsViewModel
} from "gv-api-web";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import { FundAbsoluteProfitChartDataType } from "pages/invest/funds/fund-details/reducers/absolute-profit-chart.reducer";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { ApiAction, CurrencyEnum } from "utils/types";

import {
  FETCH_FUND_ABSOLUTE_PROFIT_CHART,
  FETCH_FUND_BALANCE_CHART,
  FETCH_FUND_DESCRIPTION,
  FETCH_FUND_PROFIT_CHART,
  FUND_HISTORY,
  FUND_REALLOCATE_HISTORY,
  SET_FUND_STATISTIC_CURRENCY,
  SET_FUND_STATISTIC_PERIOD
} from "../fund-details.constants";
import { FundProfitChartDataType } from "../reducers/profit-chart.reducer";

export const fetchFundProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FundProfitChartDataType> => ({
  type: FETCH_FUND_PROFIT_CHART,
  payload: api.funds().getFundProfitPercentCharts(id, {
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
  payload: api.funds().getFundAbsoluteProfitChart(id, {
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
  payload: api.funds().getFundBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchFundDescriptionAction = (
  id: string,
  token: Token,
  currency: CurrencyEnum
): ApiAction<FundDetailsFull> => ({
  type: FETCH_FUND_DESCRIPTION,
  payload: api.funds(token).getFundDetails(id, { currency }) // TODO auth
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
): ApiAction<ReallocationModelItemsViewModel> => ({
  type: FUND_REALLOCATE_HISTORY,
  payload: api.funds().getReallocatingHistory(id, filters)
});

export const fundHistoryTableAction = (
  id: string,
  filters?: FilteringType
): ApiAction<TableItems<IFundHistoryDataItem>> => ({
  type: FUND_HISTORY,
  payload: api.funds().getFundsHistoryEvents(id, filters)
});
