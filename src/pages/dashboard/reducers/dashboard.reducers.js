import { combineReducers } from "redux";

import dashboardEventsReducer from "./dashboard-events.reducer";
import dashboardProgramsReducer from "./dashboard-program.reducer";

const dashboardReducer = combineReducers({
  eventsData: dashboardEventsReducer,
  propgramsData: dashboardProgramsReducer
});
export default dashboardReducer;
