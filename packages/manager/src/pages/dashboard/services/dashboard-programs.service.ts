import { CancelablePromise, ProgramsList } from "gv-api-web";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardPrograms = (
  requestFilters?: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramsList>> =>
  actions.fetchDashboardProgramsAction(
    authService.getAuthArg(),
    requestFilters
  );
