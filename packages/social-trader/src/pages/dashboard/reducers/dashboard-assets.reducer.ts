
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

export type ManagerAssetsState = IApiState<any>;

export const dashboardAssetsSelector = apiSelector<
  any,
  AuthRootState
>(state => state.dashboard.assets);

export const dashboardAssetsProgramsSelector = apiFieldSelector<
  any,
  any[],
  AuthRootState
>(dashboardAssetsSelector, fieldSelector(state => state.programs), []);

export const dashboardAssetsFundsSelector = apiFieldSelector<
  any,
  any[],
  AuthRootState
>(dashboardAssetsSelector, fieldSelector(state => state.funds), []);

const dashboardAssetReducer = apiReducerFactory<any>({
  apiType: DASHBOARD_ASSETS
});

export default dashboardAssetReducer;
