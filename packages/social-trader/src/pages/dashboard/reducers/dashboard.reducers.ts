import dashboardInvestmentsReducer, {
  DashboardInvestmentsState
} from "pages/dashboard/reducers/dashboard-investments.reducers";
import dashboardTradingReducer, {
  DashboardTradingState
} from "pages/dashboard/reducers/dashboard-trading.reducers";
import { combineReducers } from "redux";

export type DashboardState = {
  trading: DashboardTradingState;
  investments: DashboardInvestmentsState;
};

const dashboardReducer = combineReducers<DashboardState>({
  trading: dashboardTradingReducer,
  investments: dashboardInvestmentsReducer
});

export default dashboardReducer;
