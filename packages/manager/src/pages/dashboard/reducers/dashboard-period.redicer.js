import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";

import { DASHBOARD_PERIOD } from "../actions/dashboard.actions";

const initialState = DEFAULT_PERIOD;

const dashboardPeriodReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_PERIOD:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export default dashboardPeriodReducer;
