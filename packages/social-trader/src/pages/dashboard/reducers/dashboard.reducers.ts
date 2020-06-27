import dashboardInvestmentsReducer, {
  DashboardInvestmentsState
} from "pages/dashboard/reducers/dashboard-investments.reducers";
import { combineReducers } from "redux";

export type DashboardState = {
  investments: DashboardInvestmentsState;
};

const dashboardReducer = combineReducers<DashboardState>({
  investments: dashboardInvestmentsReducer
});

export default dashboardReducer;
