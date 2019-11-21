import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";

import { DASHBOARD_ASSETS } from "../actions/dashboard.actions";

export type ManagerAssetsState = IApiState<any>;

const dashboardAssetReducer = apiReducerFactory<any>({
  apiType: DASHBOARD_ASSETS
});

export default dashboardAssetReducer;
