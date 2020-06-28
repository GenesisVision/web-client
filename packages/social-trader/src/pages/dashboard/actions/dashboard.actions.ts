import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  DASHBOARD_INVESTMENTS_FUNDS,
  TInvestmentsFundsAction
} from "pages/dashboard/reducers/dashboard-investments-funds.reducer";
import {
  DASHBOARD_INVESTMENTS_PROGRAMS,
  TInvestmentsProgramsAction
} from "pages/dashboard/reducers/dashboard-investments-programs.reducer";
import {
  getInvestingFunds,
  getInvestingPrograms
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
