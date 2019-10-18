import {
  CancelablePromise,
  FundsList,
  ProgramsListOld,
  SignalsList
} from "gv-api-web";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = (
  filters: ComposeFiltersAllType
): ActionType<Promise<FundsList>> => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardFundsAction(authorization, filters);
};

export const getDashboardPrograms = (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramsListOld>> => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardProgramsAction(authorization, filters);
};

export const getDashboardCopytrading = (
  filters: ComposeFiltersAllType
): ActionType<Promise<SignalsList>> => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardCopytradingAction(authorization, filters);
};
