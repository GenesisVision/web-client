import {
  dashboardTradingFollowThemReducer,
  TTradingFollowThemState
} from "pages/dashboard/reducers/dashboard-trading-follow-them.reducer";
import {
  dashboardTradingPrivateReducer,
  TTradingPrivateState
} from "pages/dashboard/reducers/dashboard-trading-private.reducer";
import {
  dashboardTradingPublicReducer,
  TTradingPublicState
} from "pages/dashboard/reducers/dashboard-trading-public.reducer";
import { combineReducers } from "redux";

export type DashboardTradingState = {
  public: TTradingPublicState;
  private: TTradingPrivateState;
  followThem: TTradingFollowThemState;
};

const dashboardTradingReducer = combineReducers<DashboardTradingState>({
  public: dashboardTradingPublicReducer,
  private: dashboardTradingPrivateReducer,
  followThem: dashboardTradingFollowThemReducer
});

export default dashboardTradingReducer;
