import { ProgramRequests } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_IN_REQUESTS } from "../actions/dashboard.actions";

export type ProgramRequestsState = IApiReducerFactory<ProgramRequests>;

const dashboardInRequestsReducer = apiReducerFactory<ProgramRequests>({
  apiType: DASHBOARD_IN_REQUESTS
});
export default dashboardInRequestsReducer;
