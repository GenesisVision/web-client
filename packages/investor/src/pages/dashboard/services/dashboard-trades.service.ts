import { Action, Dispatch } from "redux";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getDashboardOpenTrades = (filters: any) => (
  dispatch: Dispatch<Action>
) => {
  const authorization = authService.getAuthArg();
  dispatch(actions.fetchDashboardOpenTrades(authorization, filters));
};
