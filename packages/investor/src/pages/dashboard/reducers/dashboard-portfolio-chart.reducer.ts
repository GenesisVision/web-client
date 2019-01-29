import { DashboardChartValue } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_CHART } from "../actions/dashboard.actions";

export interface IDashboardPortfolioChartReducer
  extends IApiReducerFactory<DashboardChartValue> {}

const dashboardPortfolioChartReducer = apiReducerFactory<DashboardChartValue>({
  apiType: DASHBOARD_PORTFOLIO_CHART
});
export default dashboardPortfolioChartReducer;
