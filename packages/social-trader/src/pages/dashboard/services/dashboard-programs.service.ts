import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  CancelablePromise,
  ItemsViewModelProgramDetailsList
} from "gv-api-web";
import authService from "shared/services/auth-service";
import { ActionType } from "utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardPrograms = (
  requestFilters?: ComposeFiltersAllType
): ActionType<CancelablePromise<ItemsViewModelProgramDetailsList>> =>
  actions.fetchDashboardProgramsAction(
    authService.getAuthArg(),
    requestFilters
  );
