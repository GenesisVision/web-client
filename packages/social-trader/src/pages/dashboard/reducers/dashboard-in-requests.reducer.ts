import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { apiSelector } from "utils/selectors";
import { AuthRootState } from "utils/types";

import { DASHBOARD_IN_REQUESTS } from "../actions/dashboard.actions";

export type ProgramRequestsState = IApiState<any>; //ProgramRequestsOld;

const dashboardInRequestsReducer = apiReducerFactory<any>({
  //ProgramRequestsOld
  apiType: DASHBOARD_IN_REQUESTS
});
export default dashboardInRequestsReducer;
