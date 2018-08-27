import { combineReducers } from "redux";

import dashboardEvents from "./dashboard-events.reducer";

const dashboardReducer = combineReducers({
  chart: {},
  dashboardEvents
});
export default dashboardReducer;
