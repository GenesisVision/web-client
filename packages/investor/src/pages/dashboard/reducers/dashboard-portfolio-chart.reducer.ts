import { DashboardChartValue } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiErrorSelector, apiSelector } from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_PORTFOLIO_CHART } from "../actions/dashboard.actions";

export type DashboardPortfolioChartState = IApiState<DashboardChartValue>;

export const dashboardPortfolioChartSelector = apiSelector<
  DashboardChartValue,
  AuthRootState
>(state => state.dashboard.portfolioChartData);

export const dashboardPortfolioChartErrorSelector = apiErrorSelector<
  DashboardChartValue,
  AuthRootState
>(state => state.dashboard.portfolioChartData);

const dashboardPortfolioChartReducer = apiReducerFactory<DashboardChartValue>({
  apiType: DASHBOARD_PORTFOLIO_CHART
});
export default dashboardPortfolioChartReducer;
