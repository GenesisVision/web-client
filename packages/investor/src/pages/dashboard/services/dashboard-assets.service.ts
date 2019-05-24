import {
  CancelablePromise,
  FundsList,
  ProgramsList,
  SignalsList
} from "gv-api-web";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<FundsList>> => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardFunds(authorization, filters);
};

export const getDashboardPrograms = (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramsList>> => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardPrograms(authorization, filters);
};

export const getDashboardCopytrading = (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalsList>> => {
  const authorization = authService.getAuthArg();
  return actions.fetchDashboardCopytrading(authorization, filters);
};
