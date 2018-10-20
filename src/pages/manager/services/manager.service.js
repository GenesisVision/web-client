import * as fundsTableActions from "modules/funds-table/actions/funds-table.actions";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import * as programTableActions from "../../../modules/programs-table/actions/programs-table.actions";
import * as actions from "../actions/manager.actions.js";
import { MANAGER_SLUG_URL_PARAM_NAME } from "../manager.page";
import { MANAGER_DETAILS_ROUTE } from "../manager.page.js";

export const fetchManagerProfile = () => (dispatch, getState) => {
  const { routing } = getState();

  const managerSlugUrl = getParams(
    routing.location.pathname,
    MANAGER_DETAILS_ROUTE
  )[MANAGER_SLUG_URL_PARAM_NAME];

  return actions.fetchManagerProfile(managerSlugUrl);
};

export const getFunds = (managerId, filters) => {
  const requestFilters = { ...filters, managerId };
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  return fundsTableActions.fetchFunds(requestFilters);
};

export const getPrograms = (managerId, filters) => {
  const requestFilters = { ...filters, managerId };
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  return programTableActions.fetchPrograms(requestFilters);
};
