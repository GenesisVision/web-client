import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
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
  getFollowThem,
  getInvestingFunds,
  getInvestingMostProfitable,
  getInvestingPrograms,
  getPrivateAssets,
  getPublicAssets
} from "pages/dashboard/services/dashboard.service";

export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";

export const CLEAR_DASHBOARD_ASSETS_TABLE = "CLEAR_DASHBOARD_ASSETS_TABLE";

// TODO move actions to shared

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

export const fetchDashboardFollowThemAction = (): TTradingFollowThemAction => ({
  type: DASHBOARD_TRADING_FOLLOW_THEM,
  payload: getFollowThem()
});
