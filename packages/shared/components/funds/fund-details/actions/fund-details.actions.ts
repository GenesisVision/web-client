import {
  FundBalanceChart,
  FundDetailsFull,
  FundProfitChart,
  LevelsParamsInfo
} from "gv-api-web";
import { getDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import fundsApi from "shared/services/api-client/funds-api";
import platformApi from "shared/services/api-client/platform-api";
import { ApiAction, CurrencyEnum } from "shared/utils/types";

export const FETCH_FUND_PROFIT_CHART = "FETCH_FUND_PROFIT_CHART";
export const FETCH_FUND_BALANCE_CHART = "FETCH_FUND_BALANCE_CHART";
export const FETCH_FUND_DESCRIPTION = "FETCH_FUND_DESCRIPTION";
export const FETCH_LEVEL_PARAMETERS = "FETCH_LEVEL_PARAMETERS";

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

export const fetchLevelParametersAction = (
  currency: CurrencyEnum
): ApiAction<LevelsParamsInfo> => ({
  type: FETCH_LEVEL_PARAMETERS,
  payload: platformApi.v10PlatformLevelsParametersGet({ currency })
});
