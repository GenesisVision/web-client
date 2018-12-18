import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioEvents = filters => {
  const authorization = authService.getAuthArg();

  return investorApi
    .v10InvestorPortfolioEventsGet(authorization, filters)
    .then(data => ({
      items: data.events,
      total: data.total
    }));
};

export const getTopPortfolioEvents = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioEvents(authorization, { take: 5 }));
};
