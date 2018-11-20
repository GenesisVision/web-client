import { combineReducers } from "redux";

import dashboardEventsReducer from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer from "./dashboard-in-requests.reducer";
import dashboardPortfolioChartReducer from "./dashboard-portfolio-chart.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

const dashboardReducer = combineReducers({
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  portfolioChartData: dashboardPortfolioChartReducer,
  inRequestsData: dashboardInRequestsReducer,
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
