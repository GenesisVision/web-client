import { combineReducers } from "redux";
import { DeepReadonly } from "utility-types";

import dashboardCopytradingReducer from "./dashboard-copytrading.reducer";
import dashboardEventsReducer, {
  DashboardEventsState
} from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer, {
  DashboardInRequestsState
} from "./dashboard-in-requests.reducer";
import dashboardPortfolioChartReducer, {
  DashboardPortfolioChartState
} from "./dashboard-portfolio-chart.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

export type DashboardState = DeepReadonly<{
  programs: any;
  funds: any;
  copytrading: any;
  portfolioChartData: DashboardPortfolioChartState;
  inRequestsData: DashboardInRequestsState;
  eventsData: DashboardEventsState;
}>;

const dashboardReducer = combineReducers<DashboardState>({
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  copytrading: dashboardCopytradingReducer,
  portfolioChartData: dashboardPortfolioChartReducer,
  inRequestsData: dashboardInRequestsReducer,
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
