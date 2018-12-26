import {
  DASHBOARD_PROGRAMS_DEFAULT_FILTERING,
  DASHBOARD_PROGRAMS_FILTERS
} from "shared/components/dashboard/dashboard.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_DASHBOARD_ASSETS_TABLE,
  DASHBOARD_PROGRAMS
} from "../actions/dashboard.actions";

const dashboardProgramsReducer = tableReducerFactory({
  type: DASHBOARD_PROGRAMS,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_PROGRAMS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_PROGRAMS_FILTERS,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_ASSETS_TABLE
});

export default dashboardProgramsReducer;
