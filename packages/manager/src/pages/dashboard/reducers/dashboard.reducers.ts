import { FundsList, InvestmentEventViewModels, ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ITableState } from "shared/components/table/reducers/table.reducer";
import { IDashboardAssetChart } from "shared/constants/constants";
import { Nullable } from "shared/utils/types";

import dashboardAssetChartReducer from "./dashboard-asset-chart.reducer";
import dashboardAssetReducer, {
  ManagerAssetsState
} from "./dashboard-assets.reducer";
import dashboardEventsReducer, {
  dashboardEventsAllReducer,
  ManagerPortfolioEventsState
} from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer, {
  ProgramRequestsState
} from "./dashboard-in-requests.reducer";
import dashboardPeriodReducer from "./dashboard-period.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

export type ManagerDashboardState = {
  eventsTable: ITableState<InvestmentEventViewModels>;
  period: ChartDefaultPeriod;
  assets: ManagerAssetsState;
  assetChart: Nullable<IDashboardAssetChart>;
  eventsData: ManagerPortfolioEventsState;
  programs: ITableState<ProgramsList>;
  funds: ITableState<FundsList>;
  inRequestsData: ProgramRequestsState;
};

const dashboardReducer = combineReducers<ManagerDashboardState>({
  eventsTable: dashboardEventsAllReducer,
  period: dashboardPeriodReducer,
  assets: dashboardAssetReducer,
  assetChart: dashboardAssetChartReducer,
  eventsData: dashboardEventsReducer,
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  inRequestsData: dashboardInRequestsReducer
});

export default dashboardReducer;
