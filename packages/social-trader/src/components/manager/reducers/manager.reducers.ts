import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";

type ManagerProfile = any;
const MANAGER_PROFILE = "MANAGER_PROFILE";

export type ManagerState = IApiState<ManagerProfile>;

const managerReducer = apiReducerFactory<ManagerProfile>({
  apiType: MANAGER_PROFILE
});

export default managerReducer;
