import { DEFAULT_PERIOD } from "components/chart/chart-period/chart-period.helpers";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import { composeRequestFilters } from "modules/table/services/table.service";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import { programsApiProxy } from "services/api-client/programs-api";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import { PROGRAM_SLUG_URL_PARAM_NAME } from "../../programs.routes";
import {
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";

export const getProgramDescription = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const programSlugUrl = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  )[PROGRAM_SLUG_URL_PARAM_NAME];

  return programsApiProxy.v10ProgramsByIdGet(programSlugUrl, { authorization });
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
    programsApiProxy.v10ProgramsByIdChartsProfitGet(programId, chartFilter),
    programsApiProxy.v10ProgramsByIdChartsBalanceGet(programId, chartFilter)
  ]).then(([profitChart, balanceChart]) => {
    const statisticData = {
      data: {
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
        balance: profitChart.data.balance,
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

export const getProgramHistory = (programId, currency) => {
  const tradesFilters = composeRequestFilters({
    paging: DEFAULT_PAGING,
    sorting: undefined,
    filtering: PROGRAM_TRADES_FILTERS,
    defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
  });

  return Promise.all([
    getProgramTrades({ programId, currency, filters: tradesFilters }),
    getProgramEvents()
  ]).then(([trades]) => ({
    trades
  }));
};

export const getProgramTrades = ({ programId, currency, filters }) => {
  const opts = {
    ...filters,
    currency
  };
  return programsApiProxy.v10ProgramsByIdTradesGet(programId, opts);
};

export const getProgramEvents = () => {
  return Promise.resolve();
};
