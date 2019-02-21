import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = (filters: any) => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardFunds(authorization, filters);
};

export const getDashboardPrograms = (filters: any) => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardPrograms(authorization, filters);
};

export const getDashboardCopytrading = (filters: any) => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardCopytrading(authorization, filters);
};
