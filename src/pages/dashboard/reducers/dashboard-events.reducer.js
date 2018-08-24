import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard-actions";

const dashboardEvents = apiReducerFactory({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});
export default dashboardEvents;
