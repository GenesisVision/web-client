import { ManagerProfile } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import { MANAGER_PROFILE } from "../actions/manager.actions";

export type ManagerState = IApiState<ManagerProfile>; //TODO the same Manager in the InvestorApp

const managerReducer = apiReducerFactory<ManagerProfile>({
  apiType: MANAGER_PROFILE
});

export default managerReducer;
