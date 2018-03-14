import { combineReducers } from "redux";

import dashboardChartReducer from "./dashboard-chart-reducer";
import dashboardProgramsReducer from "./dashboard-program-reducer";

const dashboardReducer = combineReducers({
  programs: dashboardProgramsReducer,
  chart: dashboardChartReducer
});
export default dashboardReducer;
