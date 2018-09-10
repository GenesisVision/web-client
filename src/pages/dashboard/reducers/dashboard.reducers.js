import { combineReducers } from "redux";

import dashboardEventsReducer from "./dashboard-events.reducer";

const dashboardReducer = combineReducers({
  eventsData: dashboardEventsReducer
});

export default dashboardReducer;
