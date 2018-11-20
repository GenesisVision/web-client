import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import { DASHBOARD_FUNDS } from "../actions/dashboard.actions";
import {
  DASHBOARD_FUNDS_DEFAULT_FILTERING,
  DASHBOARD_FUNDS_FILTERS
} from "shared/components/dashboard/dashboard.constants";

const dashboardFundsReducer = tableReducerFactory({
  type: DASHBOARD_FUNDS,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_FUNDS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_FUNDS_FILTERS
});

export default dashboardFundsReducer;
