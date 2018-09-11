import { combineReducers } from "redux";

import dashboardEventsReducer from "./dashboard-events.reducer";
import dashboardPortfolioChartReducer from "./dashboard-portfolio-chart.reducer";

const dashboardReducer = combineReducers({
  portfolioChartData: dashboardPortfolioChartReducer,
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
