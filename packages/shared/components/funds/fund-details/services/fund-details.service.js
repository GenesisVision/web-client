import {
  FUNDS_SLUG_URL_PARAM_NAME,
  FUND_DETAILS_ROUTE
} from "pages/funds/funds.routes";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";
import fundsApi from "shared/services/api-client/funds-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";

export const getFundDescription = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const programSlugUrl = getParams(
    routing.location.pathname,
    FUND_DETAILS_ROUTE
  )[FUNDS_SLUG_URL_PARAM_NAME];

  return fundsApi.v10FundsByIdGet(programSlugUrl, {
    authorization
  });
};

export const getFundStatistic = (fundId, currency, period = DEFAULT_PERIOD) => {
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };
  return Promise.all([
    fundsApi.v10FundsByIdChartsProfitGet(fundId, chartFilter),
    fundsApi.v10FundsByIdChartsBalanceGet(fundId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    const statistic = {
      calmarRatio: profitChart.calmarRatio,
      profitChangePercent: profitChart.profitChangePercent,
      rebalances: profitChart.rebalances,
      balance: profitChart.balance,
      trades: profitChart.trades,
      successTradesPercent: profitChart.successTradesPercent,
      profitFactor: profitChart.profitFactor,
      investors: profitChart.investors,
      sharpeRatio: profitChart.sharpeRatio,
      sortinoRatio: profitChart.sortinoRatio,
      maxDrawdown: profitChart.maxDrawdown,
      creationDate: profitChart.creationDate
    };
    const profitChartData = {
      totalGvtProfit: profitChart.totalGvtProfit,
      totalProgramCurrencyProfit: profitChart.totalProgramCurrencyProfit,
      programCurrency: profitChart.programCurrency,
      profitChangePercent: profitChart.profitChangePercent,
      pnLChart: profitChart.pnLChart,
      equityChart: profitChart.equityChart
    };

    return { statistic, profitChart: profitChartData, balanceChart };
  });
};

export const fetchFundStructure = fundId => {
  return fundsApi.v10FundsByIdAssetsGet(fundId);
};
