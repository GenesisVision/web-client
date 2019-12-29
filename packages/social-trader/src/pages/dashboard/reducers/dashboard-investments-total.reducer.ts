import { TDashboardInvestingStatistic } from "pages/dashboard/dashboard.types";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";
import { ApiAction } from "utils/types";

export const DASHBOARD_INVESTMENTS_TOTAL = "DASHBOARD_INVESTMENTS_TOTAL";

export type TInvestmentsTotalStateData = TDashboardInvestingStatistic;
export type TInvestmentsTotalState = IApiState<TInvestmentsTotalStateData>;
export type TInvestmentsTotalAction = ApiAction<TInvestmentsTotalStateData>;

export const dashboardInvestmentsTotalSelector = apiSelector<
  TInvestmentsTotalStateData,
  RootState
>(state => state.dashboard.investments.total);

export const dashboardInvestmentsTotalReducer = apiReducerFactory<
  TInvestmentsTotalStateData
>({
  apiType: DASHBOARD_INVESTMENTS_TOTAL
});
