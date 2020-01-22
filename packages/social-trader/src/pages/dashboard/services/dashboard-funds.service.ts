import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { ItemsViewModelFundDetailsListItem } from "gv-api-web";
import authService from "services/auth-service";
import { ActionType } from "utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = (
  requestFilters?: ComposeFiltersAllType
): ActionType<Promise<ItemsViewModelFundDetailsListItem>> =>
  actions.fetchDashboardFundsAction(authService.getAuthArg(), requestFilters);
