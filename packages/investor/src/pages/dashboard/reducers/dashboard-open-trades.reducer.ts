import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_DASHBOARD_TRADES_TABLE,
  DASHBOARD_OPEN_TRADES
} from "../actions/dashboard.actions";

const dashboardOpenTradesReducer = tableReducerFactory({
  type: DASHBOARD_OPEN_TRADES,
  paging: DEFAULT_PAGING,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_TRADES_TABLE
});

export default dashboardOpenTradesReducer;
