import {
  DashboardPortfolioEvent,
  DashboardPortfolioEvents,
  LevelInfo,
  ManagerPortfolioEvent,
  ManagerPortfolioEvents,
  OrderModel,
  ProgramPeriodsViewModel
} from "gv-api-web";
import { Dispatch } from "redux";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import {
  TableItems,
  mapToTableItems
} from "shared/components/table/helpers/mapper";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import brokersApi from "shared/services/api-client/brokers-api";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import platformApi from "shared/services/api-client/platform-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import {
  CurrencyEnum,
  MiddlewareDispatch,
  TGetState
} from "shared/utils/types";

import {
  fetchLevelParametersAction,
  fetchProgramBalanceChartAction,
  fetchProgramDescriptionAction,
  fetchProgramProfitChartAction,
  setProgramIdAction
} from "../actions/program-details.actions";
import { HistoryCountsType } from "../program-details.types";
import { ProgramStatisticResult } from "./program-details.types";

export const getProgramBrokers = (id: string) =>
  brokersApi.v10BrokersByProgramIdGet(id);

export const dispatchPlatformLevelsParameters = (currency: CurrencyEnum) => (
  dispatch: Dispatch
) => dispatch(fetchLevelParametersAction(currency));

export const dispatchProgramDescription = (id?: string) => (
  dispatch: MiddlewareDispatch,
  getState: TGetState
) => {
  const {
    programDetails: { id: storeId }
  } = getState();
  return dispatch(
    fetchProgramDescriptionAction(id || storeId, authService.getAuthArg())
  );
};

export const dispatchProgramId = (id: string) => (
  dispatch: MiddlewareDispatch
) => dispatch(setProgramIdAction(id));

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
      periodEnds: profitChart.lastPeriodEnds,
      tradingVolume: profitChart.tradingVolume
    };
    return { statistic, profitChart, balanceChart };
  });
};

export const closeProgram = (
  onSuccess: () => void,
  onError: () => void,
  programId: string,
  opts?: {
    twoFactorCode?: string | undefined;
  }
): any => (dispatch: Dispatch): void => {
  const authorization = authService.getAuthArg();
  managerApi
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
      onError();
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const closePeriod = (
  programId: string,
  onSuccess: () => void,
  onError: () => void
) => (dispatch: Dispatch): void => {
  const authorization = authService.getAuthArg();
  managerApi
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
      onError();
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const fetchProgramTrades = (
  id: string,
  filters?: FilteringType
): Promise<TableItems<OrderModel>> => {
  return programsApi
    .v10ProgramsByIdTradesGet(id, {
      ...filters
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
): Promise<LevelInfo[]> =>
  platformApi.v10PlatformLevelsGet({ currency }).then(({ levels }) => levels);

export const fetchHistoryCounts = (id: string): Promise<HistoryCountsType> => {
  const isAuthenticated = authService.isAuthenticated();
  const isManager = ROLE_ENV === ROLE.MANAGER;

  const filtering = { take: 0 };
  const tradesCountPromise = programsApi.v10ProgramsByIdTradesGet(
    id,
    filtering
  );
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents({ ...filtering, assetId: id })
    : Promise.resolve({ total: 0 });
  const openPositionsCountPromise = programsApi.v10ProgramsByIdTradesOpenGet(
    id
  );
  const subscriptionsCountPromise =
    isAuthenticated && isManager
      ? programsApi.v10ProgramsByIdSubscribersGet(id, authService.getAuthArg())
      : Promise.resolve({ total: 0 });
  const periodHistoryCountPromise = programsApi.v10ProgramsByIdPeriodsGet(id);
  return Promise.all([
    tradesCountPromise,
    eventsCountPromise,
    openPositionsCountPromise,
    subscriptionsCountPromise,
    periodHistoryCountPromise
  ]).then(
    ([
      tradesData,
      eventsData,
      openPositionsData,
      subscriptionsData,
      periodHistoryData
    ]) => ({
      tradesCount: tradesData.total,
      eventsCount: eventsData.total,
      openPositionsCount: openPositionsData.total,
      subscriptionsCount: subscriptionsData.total,
      periodHistoryCount: periodHistoryData.total
    })
  );
};

export const fetchPortfolioEvents: GetItemsFuncType = (
  filters?
): Promise<TableItems<ManagerPortfolioEvent | DashboardPortfolioEvent>> => {
  const authorization = authService.getAuthArg();
  let request: (
    authorization: string,
    opts?: Object
  ) => Promise<DashboardPortfolioEvents | ManagerPortfolioEvents>;
  switch (ROLE_ENV) {
    case ROLE.INVESTOR:
      request = investorApi.v10InvestorPortfolioEventsGet;
      break;
    case ROLE.MANAGER:
    default:
      request = managerApi.v10ManagerEventsGet;
      break;
  }
  return request(authorization, filters).then(
    mapToTableItems<ManagerPortfolioEvent | DashboardPortfolioEvent>("events")
  );
};

export const fetchPeriodHistory = (
  id: string,
  filters?: FilteringType
): Promise<TableItems<ProgramPeriodsViewModel>> => {
  const authorization = authService.getAuthArg();
  return programsApi
    .v10ProgramsByIdPeriodsGet(id, { authorization, ...filters })
    .then(mapToTableItems<ProgramPeriodsViewModel>("periods"));
};

export const getProfitChart = ({ id, period }: TGetChartArgs) => (
  dispatch: Dispatch
) => dispatch(fetchProgramProfitChartAction(id, period));

export const getBalanceChart = ({ id, period }: TGetChartArgs) => (
  dispatch: Dispatch
) => {
  dispatch(fetchProgramBalanceChartAction(id, period));
};

type TGetChartArgs = {
  id: string;
  period?: ChartDefaultPeriod;
};
