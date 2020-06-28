import {
  dashboardInvestmentsFundsReducer,
  TInvestmentsFundsState
} from "pages/dashboard/reducers/dashboard-investments-funds.reducer";
import {
  dashboardInvestmentsProgramsReducer,
  TInvestmentsProgramsState
} from "pages/dashboard/reducers/dashboard-investments-programs.reducer";
import { combineReducers } from "redux";

export type DashboardInvestmentsState = {
  funds: TInvestmentsFundsState;
  programs: TInvestmentsProgramsState;
};

const dashboardInvestmentsReducer = combineReducers<DashboardInvestmentsState>({
  funds: dashboardInvestmentsFundsReducer,
  programs: dashboardInvestmentsProgramsReducer
});

export default dashboardInvestmentsReducer;
