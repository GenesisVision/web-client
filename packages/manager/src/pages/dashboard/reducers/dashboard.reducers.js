import { combineReducers } from "redux";

import dashboardAssetChartReducer from "./dashboard-asset-chart.reducer";
import dashboardEventsReducer from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer from "./dashboard-in-requests.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

const dashboardReducer = combineReducers({
  assetChart: dashboardAssetChartReducer,
  eventsData: dashboardEventsReducer,
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  inRequestsData: dashboardInRequestsReducer
});

export default dashboardReducer;
