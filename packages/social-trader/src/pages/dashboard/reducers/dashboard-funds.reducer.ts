import {
  DASHBOARD_FUNDS_DEFAULT_FILTERING,
  DASHBOARD_FUNDS_FILTERS
} from "components/dashboard/dashboard.constants";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory from "components/table/reducers/table.reducer";
import { ItemsViewModelFundDetailsListItem } from "gv-api-web";

import {
  CLEAR_DASHBOARD_ASSETS_TABLE,
  DASHBOARD_FUNDS
} from "../actions/dashboard.actions";

const dashboardFundsReducer = tableReducerFactory<
  ItemsViewModelFundDetailsListItem
>({
  type: DASHBOARD_FUNDS,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_FUNDS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_FUNDS_FILTERS,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_ASSETS_TABLE
});

export default dashboardFundsReducer;
