import {
  FundsListOld,
  InvestmentEventViewModels,
  ProgramsListOld
} from "gv-api-web";
import { combineReducers } from "redux";
import { ITableState } from "shared/components/table/reducers/table.reducer";

import dashboardCopytradingReducer from "./dashboard-copytrading.reducer";
import {
  DashboardEventsState,
  dashboardEventsAllReducer,
  dashboardEventsReducer
} from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer, {
  DashboardInRequestsState
} from "./dashboard-in-requests.reducer";
import dashboardPortfolioChartReducer, {
  DashboardPortfolioChartState
} from "./dashboard-portfolio-chart.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

export type DashboardState = Readonly<{
  eventsTable: ITableState<InvestmentEventViewModels>;
  programs: ITableState<ProgramsListOld>;
  funds: ITableState<FundsListOld>;
  copytrading: any;
  portfolioChartData: DashboardPortfolioChartState;
  inRequestsData: DashboardInRequestsState;
  eventsData: DashboardEventsState;
}>;

const dashboardReducer = combineReducers<DashboardState>({
  eventsTable: dashboardEventsAllReducer,
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  copytrading: dashboardCopytradingReducer,
  portfolioChartData: dashboardPortfolioChartReducer,
  inRequestsData: dashboardInRequestsReducer,
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
