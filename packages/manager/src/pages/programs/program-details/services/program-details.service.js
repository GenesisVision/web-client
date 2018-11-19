import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "shared/components/programs/program-details/program-details.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { composeRequestFilters } from "shared/components/table/services/table.service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { managerApiProxy } from "shared/services/api-client/manager-api";
import { programsApiProxy } from "shared/services/api-client/programs-api";
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

export const closeProgram = (programId, opts) => dispatch => {
  const authorization = authService.getAuthArg();

  return managerApiProxy.v10ManagerProgramsByIdClosePost(
    programId,
    authorization,
    opts
  );
};

export const closePeriod = (programId, onSuccess) => dispatch => {
  const authorization = authService.getAuthArg();
  return managerApiProxy
    .v10ManagerProgramsByIdPeriodClosePost(programId, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.close-period.notification-success",
          true
        )
      );
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};
