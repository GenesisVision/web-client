import { DASHBOARD_ASSET_CHART } from "../actions/dashboard.actions";

const initialState = null;

const dashboardAssetChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_ASSET_CHART:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export default dashboardAssetChartReducer;
