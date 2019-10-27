import { IDashboardAssetChart } from "shared/constants/constants";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { Nullable } from "shared/utils/types";

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
