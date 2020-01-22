import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { EVENTS_ACTION_TYPE } from "components/portfolio-events-table/portfolio-events-table.constants";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDashboardAssetChart } from "constants/constants";
import {
  InvestmentEventViewModels,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem
} from "gv-api-web";
import {
  DASHBOARD_INVESTMENTS_FUNDS,
  TInvestmentsFundsAction
} from "pages/dashboard/reducers/dashboard-investments-funds.reducer";
import {
  DASHBOARD_INVESTMENTS_MOST_PROFITABLE,
  TInvestmentsMostProfitableAction
} from "pages/dashboard/reducers/dashboard-investments-most-profitable.reducer";
import {
  DASHBOARD_INVESTMENTS_PROGRAMS,
  TInvestmentsProgramsAction
} from "pages/dashboard/reducers/dashboard-investments-programs.reducer";
import {
  DASHBOARD_INVESTMENTS_TOTAL,
  TInvestmentsTotalAction
} from "pages/dashboard/reducers/dashboard-investments-total.reducer";
import {
  DASHBOARD_TRADING_FOLLOW_THEM,
  TTradingFollowThemAction
} from "pages/dashboard/reducers/dashboard-trading-follow-them.reducer";
import {
  DASHBOARD_TRADING_PRIVATE,
  TTradingPrivateAction
} from "pages/dashboard/reducers/dashboard-trading-private.reducer";
import {
  DASHBOARD_TRADING_PUBLIC,
  TTradingPublicAction
} from "pages/dashboard/reducers/dashboard-trading-public.reducer";
import {
  DASHBOARD_TRADING_TOTAL,
  TTradingTotalAction
} from "pages/dashboard/reducers/dashboard-trading-total.reducer";
import {
  fetchTradingTotalStatistic,
  getFollowThem,
  getInvestingFunds,
  getInvestingMostProfitable,
  getInvestingPrograms,
  getPrivateAssets,
  getPublicAssets,
  getTotalInvestingStatistic
} from "pages/dashboard/services/dashboard.service";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "pages/invest/programs/program-details/service/program-details.service";
import { Action } from "redux";
import { ActionType, CurrencyEnum } from "utils/types";

export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";
export const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";
export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_PROGRAMS_FILTERS = "DASHBOARD_PROGRAMS_FILTERS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_FUNDS_FILTERS = "DASHBOARD_FUNDS_FILTERS";
export const DASHBOARD_CANCEL_FUND_REQUESTS = "DASHBOARD_CANCEL_FUND_REQUESTS";
export const DASHBOARD_CANCEL_PROGRAM_REQUESTS =
  "DASHBOARD_CANCEL_PROGRAM_REQUESTS";

export const DASHBOARD_ASSET_CHART = "DASHBOARD_ASSET_CHART";
export const DASHBOARD_ASSETS = "DASHBOARD_ASSETS";
export const DASHBOARD_PERIOD = "DASHBOARD_PERIOD";

export const CLEAR_DASHBOARD_ASSETS_TABLE = "CLEAR_DASHBOARD_ASSETS_TABLE";

export const fetchEventsAction = (
  filters: ComposeFiltersAllType,
  eventLocation: EVENT_LOCATION
): ActionType<Promise<InvestmentEventViewModels>> => ({
  type: EVENTS_ACTION_TYPE,
  payload: fetchPortfolioEventsWithoutTable(eventLocation, filters)
});

const managerApi: any = {};

export const fetchPortfolioEventsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<Promise<InvestmentEventViewModels>> => ({
  type: DASHBOARD_PORTFOLIO_EVENTS,
  payload: managerApi.getEvents(auth, filters)
});

export const fetchInRequestsAction = (
  auth: string,
  skip: number,
  take: number,
  assetType?: "All" | "Program" | "Fund" | "Signal"
): ActionType<Promise<any>> => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: managerApi.getRequests(skip, take, auth, {
    assetType
  })
});

export const fetchDashboardProgramsAction = (
  auth: string,
  filters?: ComposeFiltersAllType
): ActionType<Promise<ItemsViewModelProgramDetailsListItem>> => ({
  type: DASHBOARD_PROGRAMS,
  payload: managerApi.getManagerPrograms(auth, filters)
});

export const fetchDashboardFundsAction = (
  auth: string,
  filters?: ComposeFiltersAllType
): ActionType<Promise<ItemsViewModelFundDetailsListItem>> => ({
  type: DASHBOARD_FUNDS,
  payload: managerApi.getManagerFunds(auth, filters)
});

export const cancelProgramRequestAction = (
  auth: string,
  id: string
): ActionType<Promise<any>> => ({
  type: DASHBOARD_CANCEL_PROGRAM_REQUESTS,
  payload: managerApi.cancelRequest(id, auth)
});

export type TDashboardChartAction = ActionType<IDashboardAssetChart>;
export const dashboardChartAction = (
  assetChart: IDashboardAssetChart
): TDashboardChartAction => ({
  type: DASHBOARD_ASSET_CHART,
  payload: assetChart
});

export const fetchAssetsAction = (auth: string): ActionType<Promise<any>> => ({
  type: DASHBOARD_ASSETS,
  payload: managerApi.getManagerAssets(auth)
});

export type TSetPeriodAction = ActionType<ChartDefaultPeriod>;
export const setPeriodAction = (
  payload: ChartDefaultPeriod
): TSetPeriodAction => ({
  type: DASHBOARD_PERIOD,
  payload
});

export const clearDashboardAssetsTableAction = (): Action => ({
  type: CLEAR_DASHBOARD_ASSETS_TABLE
});

// TODO move actions to shared

export const fetchDashboardInvestmentsTotalAction = (
  currency: CurrencyEnum
): TInvestmentsTotalAction => ({
  type: DASHBOARD_INVESTMENTS_TOTAL,
  payload: getTotalInvestingStatistic({ currency })
});

export const fetchDashboardInvestmentsFundsAction = (
  filters?: ComposeFiltersAllType
): TInvestmentsFundsAction => ({
  type: DASHBOARD_INVESTMENTS_FUNDS,
  payload: getInvestingFunds(filters)
});

export const fetchDashboardInvestmentsProgramsAction = (
  filters?: ComposeFiltersAllType
): TInvestmentsProgramsAction => ({
  type: DASHBOARD_INVESTMENTS_PROGRAMS,
  payload: getInvestingPrograms(filters)
});

export const fetchDashboardInvestmentsMostProfitableAction = (
  filters?: ComposeFiltersAllType
): TInvestmentsMostProfitableAction => ({
  type: DASHBOARD_INVESTMENTS_MOST_PROFITABLE,
  payload: getInvestingMostProfitable(filters)
});

export const fetchDashboardTradingTotalAction = (
  currency: CurrencyEnum
): TTradingTotalAction => ({
  type: DASHBOARD_TRADING_TOTAL,
  payload: fetchTradingTotalStatistic({ currency })
});

export const fetchDashboardPublicAction = (
  filters?: ComposeFiltersAllType
): TTradingPublicAction => ({
  type: DASHBOARD_TRADING_PUBLIC,
  payload: getPublicAssets(filters)
});

export const fetchDashboardPrivateAction = (
  filters?: ComposeFiltersAllType
): TTradingPrivateAction => ({
  type: DASHBOARD_TRADING_PRIVATE,
  payload: getPrivateAssets(filters)
});

export const fetchDashboardFollowThemAction = (
  filters?: ComposeFiltersAllType
): TTradingFollowThemAction => ({
  type: DASHBOARD_TRADING_FOLLOW_THEM,
  payload: getFollowThem()
});
