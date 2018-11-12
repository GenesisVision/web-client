import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";
import { DASHBOARD_PROGRAMS } from "../actions/dashboard-actions.constants";
import { TYPE_FILTER_NAME } from "../dashboard.constants";

const DASHBOARD_PROGRAMS_FILTER = [{ name: TYPE_FILTER_NAME, value: "all" }];

const dashboardFilteringReducer = filteringReducerFactory({
  type: DASHBOARD_PROGRAMS,
  filters: {
    defaultFilters: DASHBOARD_PROGRAMS_FILTER
  }
});

export default dashboardFilteringReducer;
