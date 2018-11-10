import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_INFO } from "../actions/dashboard-actions.constants";

const dashboardInfoReducer = apiReducerFactory({
  apiType: DASHBOARD_INFO
});
export default dashboardInfoReducer;
