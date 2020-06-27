import {
  dashboardInvestmentsFundsReducer,
  TInvestmentsFundsState
} from "pages/dashboard/reducers/dashboard-investments-funds.reducer";
import {
  dashboardInvestmentsMostProfitableReducer,
  TInvestmentsMostProfitableState
} from "pages/dashboard/reducers/dashboard-investments-most-profitable.reducer";
import {
  dashboardInvestmentsProgramsReducer,
  TInvestmentsProgramsState
} from "pages/dashboard/reducers/dashboard-investments-programs.reducer";
import { combineReducers } from "redux";

export type DashboardInvestmentsState = {
  funds: TInvestmentsFundsState;
  programs: TInvestmentsProgramsState;
  mostProfitable: TInvestmentsMostProfitableState;
};

const dashboardInvestmentsReducer = combineReducers<DashboardInvestmentsState>({
  funds: dashboardInvestmentsFundsReducer,
  programs: dashboardInvestmentsProgramsReducer,
  mostProfitable: dashboardInvestmentsMostProfitableReducer
});

export default dashboardInvestmentsReducer;
