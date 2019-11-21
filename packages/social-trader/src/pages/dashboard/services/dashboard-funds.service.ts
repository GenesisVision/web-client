import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { CancelablePromise, ItemsViewModelFundDetailsList } from "gv-api-web";
import authService from "shared/services/auth-service";
import { ActionType } from "utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = (
  requestFilters?: ComposeFiltersAllType
): ActionType<CancelablePromise<ItemsViewModelFundDetailsList>> =>
  actions.fetchDashboardFundsAction(authService.getAuthArg(), requestFilters);
