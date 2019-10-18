import { DashboardChartValue } from "gv-api-web";
import { combineReducers } from "redux";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import chartPeriodReducer from "shared/reducers/reducer-creators/chart-period.reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_PORTFOLIO_CHART } from "../actions/dashboard.actions";

export type DashboardPortfolioChartState = {
  period: ChartDefaultPeriod;
  chartData: IApiState<DashboardChartValue>;
};

export const dashboardPortfolioChartPeriodSelector = (
  state: AuthRootState
): ChartDefaultPeriod => state.dashboard.portfolioChart.period;

export const dashboardPortfolioChartSelector = apiSelector<
  DashboardChartValue,
  AuthRootState
>(state => state.dashboard.portfolioChart.chartData);

const dashboardPortfolioChartReducer = combineReducers({
  period: chartPeriodReducer(DASHBOARD_PORTFOLIO_CHART, getDefaultPeriod()),
  chartData: apiReducerFactory<DashboardChartValue>({
    apiType: DASHBOARD_PORTFOLIO_CHART
  })
});

export default dashboardPortfolioChartReducer;
