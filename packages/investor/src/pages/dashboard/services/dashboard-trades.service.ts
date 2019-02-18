import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getDashboardOpenTrades = (filters: any) => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardOpenTrades(authorization, filters);
};
