import { DASHBOARD_ASSETS } from "../actions/dashboard.actions";

const initialState = null;

const dashboardAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_ASSETS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export default dashboardAssetReducer;
