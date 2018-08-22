import * as actions from "../actions/dashboard-actions";

export const getChartCommon = () => (dispatch, getState) => {
  dispatch(actions.fetchChartCommon());
};

export const getPortfolioEvents = () => (dispatch, getState) => {
  dispatch(actions.fetchPortfolioEvents());
};

export const getAssets = () => (dispatch, getState) => {
  dispatch(actions.fetchPortfolioEvents());
};
