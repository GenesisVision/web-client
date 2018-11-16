import * as actionsFunds from "modules/funds-table/actions/funds-table.actions";
import * as actionsPrograms from "modules/programs-table/actions/programs-table.actions";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";

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
  return actionsFunds.fetchFunds(requestFilters).payload.then(data => {
    return { items: data.funds, total: data.total };
  });
};

export const getPrograms = (managerId, filters) => {
  const requestFilters = { ...filters, managerId };
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  return actionsPrograms.fetchPrograms(requestFilters).payload.then(data => {
    return { items: data.programs, total: data.total };
  });
};
