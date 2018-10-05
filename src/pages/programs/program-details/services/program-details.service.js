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
  ]).then(values => {
    const statistic = {
      data: {
        trades: values[0].data.trades,
        successTradesPercent: values[0].data.successTradesPercent,
        profitFactor: values[0].data.profitFactor,
        investors: values[0].data.investors,
        sharpeRatio: values[0].data.sharpeRatio,
        sortinoRatio: values[0].data.sortinoRatio,
        maxDrawdown: values[0].data.maxDrawdown,
        periodStarts: values[0].data.lastPeriodStarts,
        periodEnds: values[0].data.lastPeriodEnds
      },
      isPending: values[0].isPending
    };
    const profitChart = {
      data: {
        totalGvtProfit: values[0].data.totalGvtProfit,
        totalProgramCurrencyProfit: values[0].data.totalProgramCurrencyProfit,
        programCurrency: values[0].data.programCurrency,
        profitChangePercent: values[0].data.profitChangePercent,
        pnLChart: values[0].data.pnLChart,
        equityChart: values[0].data.equityChart
      },
      isPending: values[0].isPending
    };

    const balanceChart = values[1];

    return { statistic, profitChart, balanceChart };
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
  ]).then(values => ({
    trades: values[0]
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
