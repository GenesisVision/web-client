import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { ManagerProfile } from "gv-api-web";

import { MANAGER_PROFILE } from "../actions/manager.actions";
export type ManagerState = IApiReducerFactory<ManagerProfile>; //TODO the same Manager in the InvestorApp

const managerReducer = apiReducerFactory<ManagerProfile>({
  apiType: MANAGER_PROFILE
});

export default managerReducer;
