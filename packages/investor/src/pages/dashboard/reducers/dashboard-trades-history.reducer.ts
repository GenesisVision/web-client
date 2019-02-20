import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_DASHBOARD_TRADES_TABLE,
  DASHBOARD_TRADES_HISTORY
} from "../actions/dashboard.actions";
import {
  DASHBOARD_COPYTRADING_DEFAULT_FILTERING,
  DASHBOARD_COPYTRADING_FILTERS
} from "../components/dashboard-assets/dashboard-copytrading.constants";

const dashboardTradesHistoryReducer = tableReducerFactory({
  type: DASHBOARD_TRADES_HISTORY,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_COPYTRADING_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_COPYTRADING_FILTERS,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_TRADES_TABLE
});

export default dashboardTradesHistoryReducer;
