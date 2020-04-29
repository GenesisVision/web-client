import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "components/details/reducers/statistic-period.reducer";
import { AccountBalanceChart } from "gv-api-web";
import { FollowAbsoluteProfitChartDataType } from "pages/invest/follows/follow-details/reducers/absolute-profit-chart.reducer";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { ActionType, ApiAction, CurrencyEnum } from "utils/types";

import {
  FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART,
  FETCH_FOLLOW_BALANCE_CHART,
  FETCH_FOLLOW_DESCRIPTION,
  FETCH_FOLLOW_PROFIT_CHART,
  SET_FOLLOW_ID,
  SET_FOLLOW_STATISTIC_CURRENCY,
  SET_FOLLOW_STATISTIC_PERIOD
} from "../follow-details.constants";
import { FollowDetailsDataType } from "../follow-details.types";
import { FollowIdState } from "../reducers/id.reducer";
import { FollowProfitChartDataType } from "../reducers/profit-chart.reducer";

export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_FOLLOW_STATISTIC_CURRENCY,
  payload: currency
});

export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_FOLLOW_STATISTIC_PERIOD,
  payload: period
});

export const fetchFollowProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FollowProfitChartDataType> => ({
  type: FETCH_FOLLOW_PROFIT_CHART,
  payload: api.follows().getProfitPercentCharts(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currencies
  })
});

export const fetchFollowAbsoluteProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<FollowAbsoluteProfitChartDataType> => ({
  type: FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART,
  payload: api.follows().getAbsoluteProfitChart(id, {
    dateFrom: period.start,
    dateTo: period.end,
    currency
  })
});

export const fetchFollowBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<AccountBalanceChart> => ({
  type: FETCH_FOLLOW_BALANCE_CHART,
  payload: api.follows().getBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchFollowDescriptionAction = (
  id: string,
  token?: Token
): ApiAction<FollowDetailsDataType> => ({
  type: FETCH_FOLLOW_DESCRIPTION,
  payload: api.follows(token).getFollowAssetDetails(id)
});

export interface SetFollowIdAction extends ActionType<FollowIdState> {
  type: typeof SET_FOLLOW_ID;
}
