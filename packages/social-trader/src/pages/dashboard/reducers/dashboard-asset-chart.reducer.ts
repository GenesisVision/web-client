import defaultReducer from "reducers/reducer-creators/default-reducer";
import { IDashboardAssetChart } from "shared/constants/constants";
import { Nullable } from "utils/types";

import {
  DASHBOARD_ASSET_CHART,
  TDashboardChartAction
} from "../actions/dashboard.actions";

const initialState = null;

const dashboardAssetChartReducer = (
  state: Nullable<IDashboardAssetChart> = initialState,
  action: TDashboardChartAction
): Nullable<IDashboardAssetChart> =>
  defaultReducer<TDashboardChartAction, Nullable<IDashboardAssetChart>>(
    action,
    state,
    initialState,
    DASHBOARD_ASSET_CHART
  );
export default dashboardAssetChartReducer;
