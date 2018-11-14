import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import { DASHBOARD_PROGRAMS } from "../actions/dashboard.actions";
import {
  DASHBOARD_PROGRAMS_DEFAULT_FILTERING,
  DASHBOARD_PROGRAMS_FILTERS
} from "shared/components/dashboard/dashboard.constants";

const dashboardProgramsReducer = tableReducerFactory({
  type: DASHBOARD_PROGRAMS,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_PROGRAMS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_PROGRAMS_FILTERS
});

export default dashboardProgramsReducer;
