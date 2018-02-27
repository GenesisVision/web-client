import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import dashboardLayoutReducer from "./dashboard-layout-reducer";

import { DASHBOARD } from "../actions/dashboard-actions.constants";

const dashboardReducer = apiReducerFactory({ apiType: DASHBOARD });
export default combineReducers({
  data: dashboardReducer,
  layout: dashboardLayoutReducer
});
