import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_DASHBOARD_TRADES_TABLE,
  DASHBOARD_TRADES_HISTORY
} from "../actions/dashboard.actions";

const dashboardTradesHistoryReducer = tableReducerFactory({
  type: DASHBOARD_TRADES_HISTORY,
  paging: DEFAULT_PAGING,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_TRADES_TABLE
});

export default dashboardTradesHistoryReducer;
