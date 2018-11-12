import { combineReducers } from "redux";

import dashboardInfoReducer from "./dashboard-info-reducer";
import dashboardProgramsFilteringReducer from "./dashboard-programs-filtering-reducer";
import dashboardProgramsReducer from "./dashboard-program-reducer";

const dashboardReducer = combineReducers({
  programs: combineReducers({
    items: dashboardProgramsReducer,
    filtering: dashboardProgramsFilteringReducer
  }),
  info: dashboardInfoReducer
});
export default dashboardReducer;
