import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import tableReducerFactory from "modules/table/reducers/table.reducer";
import { combineReducers } from "redux";

import { DASHBOARD_PROGRAMS } from "../actions/dashboard.actions";
import { DASHBOARD_PROGRAMS_SORTING } from "../dashboard.constants";
import dashboardEventsReducer from "./dashboard-events.reducer";

const dashboardReducer = combineReducers({
  eventsData: dashboardEventsReducer,
  programs: tableReducerFactory({
    type: DASHBOARD_PROGRAMS,
    paging: DEFAULT_PAGING,
    sorting: DASHBOARD_PROGRAMS_SORTING,
    filters: {
      dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
    }
  })
});

export default dashboardReducer;
