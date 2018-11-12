import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PORTFOLIO_CHART } from "../actions/dashboard.actions";

const dashboardPortfolioChartReducer = apiReducerFactory({
  apiType: DASHBOARD_PORTFOLIO_CHART
});
export default dashboardPortfolioChartReducer;
