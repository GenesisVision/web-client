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
import dashboardOpenTradesReducer from "./dashboard-open-trades.reducer";
import dashboardPortfolioChartReducer, {
  DashboardPortfolioChartState
} from "./dashboard-portfolio-chart.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";
import dashboardTradesHistoryReducer from "./dashboard-trades-history.reducer";

export type DashboardState = DeepReadonly<{
  programs: any;
  funds: any;
  copytrading: any;
  openTrades: any;
  tradesHistory: any;
  portfolioChartData: DashboardPortfolioChartState;
  inRequestsData: DashboardInRequestsState;
  eventsData: DashboardEventsState;
}>;

const dashboardReducer = combineReducers<DashboardState>({
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  copytrading: dashboardCopytradingReducer,
  openTrades: dashboardOpenTradesReducer,
  tradesHistory: dashboardTradesHistoryReducer,
  portfolioChartData: dashboardPortfolioChartReducer,
  inRequestsData: dashboardInRequestsReducer,
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
