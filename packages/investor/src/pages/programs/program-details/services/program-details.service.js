import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";

import { PROGRAM_SLUG_URL_PARAM_NAME } from "../../programs.routes";

export const getProgramDescription = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const programSlugUrl = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  )[PROGRAM_SLUG_URL_PARAM_NAME];

  return programsApi.v10ProgramsByIdGet(programSlugUrl, { authorization });
};

export const getProgramStatistic = (
  programId,
  currency,
  period = DEFAULT_PERIOD
) => {
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };
  return Promise.all([
    programsApi.v10ProgramsByIdChartsProfitGet(programId, chartFilter),
    programsApi.v10ProgramsByIdChartsBalanceGet(programId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    const statistic = {
      trades: profitChart.data.trades,
      successTradesPercent: profitChart.data.successTradesPercent,
      profitFactor: profitChart.data.profitFactor,
      investors: profitChart.data.investors,
      sharpeRatio: profitChart.data.sharpeRatio,
      sortinoRatio: profitChart.data.sortinoRatio,
      maxDrawdown: profitChart.data.maxDrawdown,
      periodStarts: profitChart.data.lastPeriodStarts,
      periodEnds: profitChart.data.lastPeriodEnds
    };
    const profitChartData = {
      balance: profitChart.data.balance,
      totalGvtProfit: profitChart.data.totalGvtProfit,
      totalProgramCurrencyProfit: profitChart.data.totalProgramCurrencyProfit,
      programCurrency: profitChart.data.programCurrency,
      profitChangePercent: profitChart.data.profitChangePercent,
      pnLChart: profitChart.data.pnLChart,
      equityChart: profitChart.data.equityChart
    };

    return { statistic, profitChart: profitChartData, balanceChart };
  });
};

export const fetchProgramTrades = (id, filters, currency) => {
  return programsApi.v10ProgramsByIdTradesGet(id, {
    ...filters,
    currency
  });
};
