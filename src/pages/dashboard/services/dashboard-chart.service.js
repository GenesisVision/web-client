import authService from "services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioChart = (from, to) => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  const filters = {
    currency,
    from,
    to,
    balancePoints: 15,
    programsPoints: 10
  };

  dispatch(actions.fetchPortfolioChart(authorization, filters));
};
