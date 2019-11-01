import { PublicProfile } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

const MANAGER_PROFILE = "MANAGER_PROFILE";

export type ManagerState = IApiState<PublicProfile>;

const managerReducer = apiReducerFactory<PublicProfile>({
  apiType: MANAGER_PROFILE
});

export default managerReducer;
