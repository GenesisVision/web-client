import { ManagerAssets } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

import { DASHBOARD_ASSETS } from "../actions/dashboard.actions";

export type ManagerAssetsState = IApiState<ManagerAssets>;
const dashboardAssetReducer = apiReducerFactory<ManagerAssets>({
  apiType: DASHBOARD_ASSETS
});

export default dashboardAssetReducer;
