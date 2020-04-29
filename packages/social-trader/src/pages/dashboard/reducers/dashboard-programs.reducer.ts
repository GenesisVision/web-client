import {
  DASHBOARD_PROGRAMS_DEFAULT_FILTERING,
  DASHBOARD_PROGRAMS_FILTERS
} from "components/dashboard/dashboard.constants";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory from "components/table/reducers/table.reducer";
import { ProgramDetailsListItemItemsViewModel } from "gv-api-web";

import {
  CLEAR_DASHBOARD_ASSETS_TABLE,
  DASHBOARD_PROGRAMS
} from "../actions/dashboard.actions";

const dashboardProgramsReducer = tableReducerFactory<
  ProgramDetailsListItemItemsViewModel
>({
  type: DASHBOARD_PROGRAMS,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_PROGRAMS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_PROGRAMS_FILTERS,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_ASSETS_TABLE
});

export default dashboardProgramsReducer;
