import authService from "services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioChart = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioChart(authorization));
};
