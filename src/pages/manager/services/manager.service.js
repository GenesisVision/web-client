import authService from "services/auth-service";
import getParams from "utils/get-params";
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
  return actions.fetchFunds(requestFilters);
};

export const getPrograms = (managerId, filters) => {
  const requestFilters = { ...filters, managerId };
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  return actions.fetchPrograms(requestFilters);
};

export const getFundsDispatch = (managerId, filters) => dispatch => {
  const requestFilters = { ...filters, managerId };
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  return dispatch(actions.fetchFunds(requestFilters));
};

export const getProgramsDispatch = (managerId, filters) => dispatch => {
  const requestFilters = { ...filters, managerId };
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  return dispatch(actions.fetchPrograms(requestFilters));
};
