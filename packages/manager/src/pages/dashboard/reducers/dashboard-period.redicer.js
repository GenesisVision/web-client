import { getDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";

import { DASHBOARD_PERIOD } from "../actions/dashboard.actions";

const dashboardPeriodReducer = (state = getDefaultPeriod(), action) => {
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
