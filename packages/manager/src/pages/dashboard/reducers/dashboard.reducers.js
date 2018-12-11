import { combineReducers } from "redux";

import dashboardAssetChartReducer from "./dashboard-asset-chart.reducer";
import dashboardEventsReducer from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer from "./dashboard-in-requests.reducer";
import dashboardPeriodReducer from "./dashboard-period.redicer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";
import dashboardTopAssetReducer from "./dashboard-top-assets.reducer";

const dashboardReducer = combineReducers({
  period: dashboardPeriodReducer,
  topAssets: dashboardTopAssetReducer,
  assetChart: dashboardAssetChartReducer,
  eventsData: dashboardEventsReducer,
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  inRequestsData: dashboardInRequestsReducer
});

export default dashboardReducer;
