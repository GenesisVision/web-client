import { combineReducers } from "redux";

import dashboardAssetChartReducer from "./dashboard-asset-chart.reducer";
import dashboardAssetReducer from "./dashboard-assets.reducer";
import dashboardEventsReducer from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer from "./dashboard-in-requests.reducer";
import dashboardPeriodReducer from "./dashboard-period.redicer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

const dashboardReducer = combineReducers({
  period: dashboardPeriodReducer,
  assets: dashboardAssetReducer,
  assetChart: dashboardAssetChartReducer,
  eventsData: dashboardEventsReducer,
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  inRequestsData: dashboardInRequestsReducer
});

export default dashboardReducer;
