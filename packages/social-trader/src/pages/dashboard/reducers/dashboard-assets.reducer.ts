import {
  ManagerAssets,
  ManagerSimpleFund,
  ManagerSimpleProgram
} from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_ASSETS } from "../actions/dashboard.actions";

export type ManagerAssetsState = IApiState<ManagerAssets>;

export const dashboardAssetsSelector = apiSelector<
  ManagerAssets,
  AuthRootState
>(state => state.dashboard.assets);

export const dashboardAssetsProgramsSelector = apiFieldSelector<
  ManagerAssets,
  ManagerSimpleProgram[],
  AuthRootState
>(dashboardAssetsSelector, fieldSelector(state => state.programs), []);

export const dashboardAssetsFundsSelector = apiFieldSelector<
  ManagerAssets,
  ManagerSimpleFund[],
  AuthRootState
>(dashboardAssetsSelector, fieldSelector(state => state.funds), []);

const dashboardAssetReducer = apiReducerFactory<ManagerAssets>({
  apiType: DASHBOARD_ASSETS
});

export default dashboardAssetReducer;
