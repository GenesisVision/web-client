import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { DASHBOARD } from "../actions/dashboard-actions.constants";

const dashboardReducer = apiReducerFactory({ apiType: DASHBOARD });
export default dashboardReducer;
