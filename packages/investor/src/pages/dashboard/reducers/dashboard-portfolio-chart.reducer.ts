import { DashboardChartValue } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_CHART } from "../actions/dashboard.actions";

export type DashboardPortfolioChartState = IApiState<DashboardChartValue>;

const dashboardPortfolioChartReducer = apiReducerFactory<DashboardChartValue>({
  apiType: DASHBOARD_PORTFOLIO_CHART
});
export default dashboardPortfolioChartReducer;
