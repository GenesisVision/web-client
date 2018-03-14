import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_CHART } from "../actions/dashboard-actions.constants";

const dashboardChartReducer = apiReducerFactory({
  apiType: DASHBOARD_CHART
});
export default dashboardChartReducer;
