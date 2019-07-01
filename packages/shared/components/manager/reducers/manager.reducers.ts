import { ManagerProfile } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

const MANAGER_PROFILE = "MANAGER_PROFILE";

export type ManagerState = IApiState<ManagerProfile>;

const managerReducer = apiReducerFactory<ManagerProfile>({
  apiType: MANAGER_PROFILE
});

export default managerReducer;
