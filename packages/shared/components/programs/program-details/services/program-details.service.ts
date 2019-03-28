import { OrderModel, ProgramsLevelsInfo, TradesViewModel } from "gv-api-web";
import {
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME
} from "pages/programs/programs.routes";
import { Dispatch } from "redux";
import { getDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  TableItems,
  mapToTableItems
} from "shared/components/table/helpers/mapper";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import RootState from "shared/reducers/root-reducer";
import managerApi from "shared/services/api-client/manager-api";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";

import { ProgramStatisticResult } from "./program-details.types";

export const getProgramDescription = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const authorization = authService.getAuthArg();
  const { router } = getState();

  const programSlugUrl = getParams(
    router.location.pathname,
    PROGRAM_DETAILS_ROUTE
  )[PROGRAM_SLUG_URL_PARAM_NAME];

  return programsApi.v10ProgramsByIdGet(programSlugUrl, { authorization });
};

export const getProgramStatistic = (
  programId: string,
  currency = "",
  period = getDefaultPeriod()
): Promise<ProgramStatisticResult> => {
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
      trades: profitChart.trades,
      successTradesPercent: profitChart.successTradesPercent,
      profitFactor: profitChart.profitFactor,
      investors: profitChart.investors,
      sharpeRatio: profitChart.sharpeRatio,
      sortinoRatio: profitChart.sortinoRatio,
      maxDrawdown: profitChart.maxDrawdown,
      periodStarts: profitChart.lastPeriodStarts,
      periodEnds: profitChart.lastPeriodEnds
    };
    const profitChartData = {
      balance: profitChart.balance,
      timeFrameProgramCurrencyProfit:
        profitChart.timeframeProgramCurrencyProfit,
      timeFrameGvtProfit: profitChart.timeframeGvtProfit,
      programCurrency: profitChart.programCurrency,
      profitChangePercent: profitChart.profitChangePercent,
      pnLChart: profitChart.pnLChart,
      equityChart: profitChart.equityChart
    };

    return { statistic, profitChart: profitChartData, balanceChart };
  });
};

export const closeProgram = (
  onSuccess: () => void,
  programId: string,
  opts?: {
    twoFactorCode?: string | undefined;
  }
) => (dispatch: Dispatch): Promise<void> => {
  const authorization = authService.getAuthArg();
  return managerApi
    .v10ManagerProgramsByIdClosePost(programId, authorization, opts)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "program-details-page.description.close-program-notification-success",
          true
        )
      );
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const closePeriod = (programId: string, onSuccess: () => void) => (
  dispatch: Dispatch
): Promise<void> => {
  const authorization = authService.getAuthArg();
  return managerApi
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

export const fetchProgramTrades = (
  id: string,
  filters: any,
  currency: string
): Promise<TableItems<OrderModel>> => {
  return programsApi
    .v10ProgramsByIdTradesGet(id, {
      ...filters,
      currency
    })
    .then(mapToTableItems<OrderModel>("trades"));
};

export const fetchOpenPositions = (
  id: string,
  filters: any
): Promise<TableItems<OrderModel>> => {
  return programsApi
    .v10ProgramsByIdTradesOpenGet(id, { sorting: filters.sorting })
    .then(mapToTableItems<OrderModel>("trades"));
};

export const fetchInvestmentsLevels = (
  currency: string
): Promise<ProgramsLevelsInfo> => {
  return platformApi.v10PlatformLevelsGet({ currency });
};
