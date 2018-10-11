import { DEFAULT_PERIOD } from "components/chart/chart-period/chart-period.helpers";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import { composeRequestFilters } from "modules/table/services/table.service";
import {
  FUND_DETAILS_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "pages/funds/funds.routes";
import { programsApiProxy } from "services/api-client/programs-api";
import { fundsApiProxy } from "services/api-client/funds-api";
import authService from "services/auth-service";
import getParams from "utils/get-params";

export const getFundDescription = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const programSlugUrl = getParams(
    routing.location.pathname,
    FUND_DETAILS_ROUTE
  )[FUNDS_SLUG_URL_PARAM_NAME];

  return fundsApiProxy.v10FundsByIdGetWithHttpInfo(programSlugUrl, {
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
    fundsApiProxy.v10FundsByIdChartsProfitGet(fundId, chartFilter),
    fundsApiProxy.v10FundsByIdChartsBalanceGet(fundId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    const statisticData = {
      data: {
        calmarRatio: profitChart.data.calmarRatio,
        profitChangePercent: profitChart.data.profitChangePercent,
        rebalances: profitChart.data.rebalances,
        balance: profitChart.data.balance,
        trades: profitChart.data.trades,
        successTradesPercent: profitChart.data.successTradesPercent,
        profitFactor: profitChart.data.profitFactor,
        investors: profitChart.data.investors,
        sharpeRatio: profitChart.data.sharpeRatio,
        sortinoRatio: profitChart.data.sortinoRatio,
        maxDrawdown: profitChart.data.maxDrawdown,
        periodStarts: profitChart.data.lastPeriodStarts,
        periodEnds: profitChart.data.lastPeriodEnds
      },
      isPending: profitChart.isPending
    };
    const profitChartData = {
      data: {
        totalGvtProfit: profitChart.data.totalGvtProfit,
        totalProgramCurrencyProfit: profitChart.data.totalProgramCurrencyProfit,
        programCurrency: profitChart.data.programCurrency,
        profitChangePercent: profitChart.data.profitChangePercent,
        pnLChart: profitChart.data.pnLChart,
        equityChart: profitChart.data.equityChart
      },
      isPending: profitChart.isPending
    };

    const balanceChartData = balanceChart;

    return { statisticData, profitChartData, balanceChartData };
  });
};

export const getFundRebalancing = (id, filters) => {
  return fundsApiProxy.v10FundsByIdRebalancingGet(id, filters);
};
