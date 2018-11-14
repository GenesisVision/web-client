import authService from "shared/services/auth-service";
import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = requestFilters => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardFunds(authorization, requestFilters);
};
