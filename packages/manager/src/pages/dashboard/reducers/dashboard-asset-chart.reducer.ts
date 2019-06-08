import { Nullable } from "shared/utils/types";

import {
  DASHBOARD_ASSET_CHART,
  TDashboardChartAction
} from "../actions/dashboard.actions";
import { IDashboardAssetChart } from "./dashboard.reducers";

const initialState = null;

const dashboardAssetChartReducer = (
  state: Nullable<IDashboardAssetChart> = initialState,
  action: TDashboardChartAction
): Nullable<IDashboardAssetChart> => {
  switch (action.type) {
    case DASHBOARD_ASSET_CHART:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export default dashboardAssetChartReducer;
