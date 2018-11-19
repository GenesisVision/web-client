import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getDashboardPrograms = requestFilters => {
  const authorization = authService.getAuthArg();

  return actions.fetchDashboardPrograms(authorization, requestFilters);
};
