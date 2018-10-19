import { combineReducers } from "redux";

import dashboardEventsReducer from "./dashboard-events.reducer";
import dashboardInRequestsReducer from "./dashboard-in-requests.reducer";
import dashboardPortfolioChartReducer from "./dashboard-portfolio-chart.reducer";

const dashboardReducer = combineReducers({
  portfolioChartData: dashboardPortfolioChartReducer,
  inRequestsData: dashboardInRequestsReducer,
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
