import { ProgramRequests } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_IN_REQUESTS } from "../actions/dashboard.actions";

export type ProgramRequestsState = IApiState<ProgramRequestsOld>;

export const dashboardInRequestsSelector = apiSelector<
  ProgramRequestsOld,
  AuthRootState
>(state => state.dashboard.inRequestsData);

const dashboardInRequestsReducer = apiReducerFactory<ProgramRequestsOld>({
  apiType: DASHBOARD_IN_REQUESTS
});
export default dashboardInRequestsReducer;
