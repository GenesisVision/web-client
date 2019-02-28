import { DashboardChartValue } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_IN_REQUESTS } from "../actions/dashboard.actions";

export type DashboardInRequestsState = IApiReducerFactory<DashboardChartValue>;

const dashboardInRequestsReducer = apiReducerFactory<DashboardChartValue>({
  apiType: DASHBOARD_IN_REQUESTS
});

export default dashboardInRequestsReducer;
