import { ActionType, Nullable } from "shared/utils/types";

import { DASHBOARD_ASSET_CHART } from "../actions/dashboard.actions";
import { IDashboardAssetChart } from "./dashboard.reducers";

const initialState = null;

const dashboardAssetChartReducer = (
  state: Nullable<IDashboardAssetChart> = initialState,
  action: ActionType
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
