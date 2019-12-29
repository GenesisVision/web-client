import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  CancelablePromise,
  ItemsViewModelFundDetailsListItem
} from "gv-api-web";
import authService from "services/auth-service";
import { ActionType } from "utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = (
  requestFilters?: ComposeFiltersAllType
): ActionType<CancelablePromise<ItemsViewModelFundDetailsListItem>> =>
  actions.fetchDashboardFundsAction(authService.getAuthArg(), requestFilters);
