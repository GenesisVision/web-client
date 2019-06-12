import { ManagerAssets } from "gv-api-web";
import apiReducerFactory, { IApiState } from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_ASSETS } from "../actions/dashboard.actions";

export type ManagerAssetsState = IApiState<ManagerAssets>;

export const dashboardAssetsSelector = apiSelector<ManagerAssets, AuthRootState>(state => state.dashboard.assets);

const dashboardAssetReducer = apiReducerFactory<ManagerAssets>({
  apiType: DASHBOARD_ASSETS
});

export default dashboardAssetReducer;
