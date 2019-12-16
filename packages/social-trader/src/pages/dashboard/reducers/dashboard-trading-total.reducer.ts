import { TDashboardTradingStatistic } from "pages/dashboard/dashboard.types";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";
import { ApiAction } from "utils/types";

export const DASHBOARD_TRADING_TOTAL = "DASHBOARD_TRADING_TOTAL";

export type TTradingTotalStateData = TDashboardTradingStatistic;
export type TTradingTotalState = IApiState<TTradingTotalStateData>;
export type TTradingTotalAction = ApiAction<TTradingTotalStateData>;

export const dashboardTradingTotalSelector = apiSelector<
  TTradingTotalStateData,
  RootState
>(state => state.dashboard.trading.total);

export const dashboardTradingTotalReducer = apiReducerFactory<
  TTradingTotalStateData
>({
  apiType: DASHBOARD_TRADING_TOTAL
});
