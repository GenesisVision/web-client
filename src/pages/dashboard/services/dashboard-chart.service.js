import authService from "services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioChart = period => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  const filters = {
    currency
  };
  if (period) {
    filters.from = period.from;
    filters.to = period.to;
  }

  dispatch(actions.fetchPortfolioChart(authorization, filters));
};
