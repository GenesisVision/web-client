import { ManagerProfile } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { MANAGER_PROFILE } from "../actions/manager.actions";

export type ManagerState = IApiReducerFactory<ManagerProfile>;

const managerReducer = apiReducerFactory<ManagerProfile>({
  apiType: MANAGER_PROFILE
});

export default managerReducer;
