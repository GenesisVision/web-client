import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import tableReducerFactory from "modules/table/reducers/table.reducer";

import { DASHBOARD_FUNDS } from "../actions/dashboard.actions";
import { DASHBOARD_FUNDS_DEFAULT_FILTERING } from "../dashboard.constants";

const dashboardFundsReducer = tableReducerFactory({
  type: DASHBOARD_FUNDS,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_FUNDS_DEFAULT_FILTERING
});

export default dashboardFundsReducer;
