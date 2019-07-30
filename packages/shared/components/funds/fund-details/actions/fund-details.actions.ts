import { FundBalanceChart, FundDetailsFull, FundProfitChart } from "gv-api-web";
import { getDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import fundsApi from "shared/services/api-client/funds-api";
import { ApiAction } from "shared/utils/types";

export const FETCH_FUND_PROFIT_CHART = "FETCH_FUND_PROFIT_CHART";
export const FETCH_FUND_BALANCE_CHART = "FETCH_FUND_BALANCE_CHART";
export const FETCH_FUND_DESCRIPTION = "FETCH_FUND_DESCRIPTION";

export const fetchFundProfitChartAction = (
  id: string,
  period = getDefaultPeriod()
): ApiAction<FundProfitChart> => ({
  type: FETCH_FUND_PROFIT_CHART,
  payload: fundsApi.v10FundsByIdChartsProfitGet(id, {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchFundBalanceChartAction = (
  id: string,
  period = getDefaultPeriod()
): ApiAction<FundBalanceChart> => ({
  type: FETCH_FUND_BALANCE_CHART,
  payload: fundsApi.v10FundsByIdChartsBalanceGet(id, {
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
