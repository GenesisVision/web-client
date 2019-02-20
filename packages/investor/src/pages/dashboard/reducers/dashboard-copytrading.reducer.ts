import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_DASHBOARD_ASSETS_TABLE,
  DASHBOARD_COPYTRADING
} from "../actions/dashboard.actions";

const dashboardCopytradingReducer = tableReducerFactory({
  type: DASHBOARD_COPYTRADING,
  paging: DEFAULT_PAGING,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_ASSETS_TABLE
});

export default dashboardCopytradingReducer;
