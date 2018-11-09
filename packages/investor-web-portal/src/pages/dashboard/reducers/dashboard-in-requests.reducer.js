import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_IN_REQUESTS } from "../actions/dashboard.actions";

const dashboardInRequestsReducer = apiReducerFactory({
  apiType: DASHBOARD_IN_REQUESTS
});
export default dashboardInRequestsReducer;
