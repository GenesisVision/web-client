import { DashboardChartValue } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_IN_REQUESTS } from "../actions/dashboard.actions";

export type DashboardInRequestsState = IApiState<DashboardChartValue>;

const dashboardInRequestsReducer = apiReducerFactory<DashboardChartValue>({
  apiType: DASHBOARD_IN_REQUESTS
});

export default dashboardInRequestsReducer;
