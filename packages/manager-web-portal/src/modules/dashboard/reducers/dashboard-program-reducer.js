import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PROGRAMS } from "../actions/dashboard-actions.constants";

const dashboardProgramsReducer = apiReducerFactory({
  apiType: DASHBOARD_PROGRAMS
});
export default dashboardProgramsReducer;
