import { DASHBOARD_TOP_ASSETS } from "../actions/dashboard.actions";

const initialState = null;

const dashboardTopAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_TOP_ASSETS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export default dashboardTopAssetReducer;
