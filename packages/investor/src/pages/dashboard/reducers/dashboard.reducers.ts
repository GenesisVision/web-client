import { combineReducers } from "redux";

import dashboardEventsReducer, {
  IDashboardEventsReducer
} from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer, {
  IDashboardInRequestsReducer
} from "./dashboard-in-requests.reducer";
import dashboardPortfolioChartReducer, {
  IDashboardPortfolioChartReducer
} from "./dashboard-portfolio-chart.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

export interface IDashboard {
  programs: any;
  funds: any;
  portfolioChartData: IDashboardPortfolioChartReducer;
  inRequestsData: IDashboardInRequestsReducer;
  eventsData: IDashboardEventsReducer;
}

const dashboardReducer = combineReducers({
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  portfolioChartData: dashboardPortfolioChartReducer,
  inRequestsData: dashboardInRequestsReducer,
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
