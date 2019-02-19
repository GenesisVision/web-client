import { combineReducers } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { DeepReadonly } from "utility-types";

import dashboardAssetChartReducer from "./dashboard-asset-chart.reducer";
import dashboardAssetReducer from "./dashboard-assets.reducer";
import dashboardEventsReducer, {
  ManagerPortfolioEventsState
} from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer, {
  ProgramRequestsState
} from "./dashboard-in-requests.reducer";
import dashboardPeriodReducer from "./dashboard-period.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

export type ManagerDashboardState = Readonly<{
  period: ChartDefaultPeriod;
  assets: any;
  assetChart: any;
  eventsData: ManagerPortfolioEventsState;
  programs: any;
  funds: any;
  inRequestsData: ProgramRequestsState;
}>;

const dashboardReducer = combineReducers<ManagerDashboardState>({
  period: dashboardPeriodReducer,
  assets: dashboardAssetReducer,
  assetChart: dashboardAssetChartReducer,
  eventsData: dashboardEventsReducer,
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  inRequestsData: dashboardInRequestsReducer
});

export default dashboardReducer;
