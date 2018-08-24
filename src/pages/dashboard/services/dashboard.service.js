import authService from "services/auth-service";

import * as actions from "../actions/dashboard-actions";

export const getChartCommon = () => (dispatch, getState) => {
  dispatch(actions.fetchChartCommon());
};

export const getPortfolioEvents = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioEvents(authorization));
};

export const getAssets = () => (dispatch, getState) => {
  // dispatch(actions.fetchPortfolioEvents());
};
