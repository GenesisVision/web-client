import {
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "pages/programs/program.routes";
import qs from "qs";
import { matchPath } from "react-router-dom";
import { push } from "react-router-redux";
import authService from "services/auth-service";

import programActions from "../actions/programs-actions";

export const programsServiceGetPrograms = () => (dispatch, getState) => {
  const { routing } = getState();
  const filters = composeFilters(routing.location);
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  dispatch(programActions.fetchPrograms(filters));
};

const composeFilters = location => {
  const filters = { take: 10 };
  const { tab } = getParams(location.pathname, PROGRAMS_TAB_ROUTE);
  if (tab === PROGRAMS_FAVORITES_TAB_NAME) {
    filters.isFavorite = true;
  }
  return filters;
};

const getParams = (pathname, route) => {
  const matchProfile = matchPath(pathname, {
    path: route
  });
  return (matchProfile && matchProfile.params) || {};
};

export const programsServiceIsLocationChanged = (prev, curr) => {
  return JSON.stringify(prev) !== JSON.stringify(curr);
};

export const programsServiceGetFilteringFromUrl = () => (
  dispatch,
  getState
) => {
  const { routing } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  const filtering = {
    page: +queryParams.page || 0,
    sorting: queryParams.sorting || "name",
    levels: "all",
    currency: "all"
  };
  return filtering;
};

export const programsServiceChangePage = nextPage => (dispatch, getState) => {
  const { routing } = getState();
  const filtering = dispatch(programsServiceGetFilteringFromUrl);
  const newUrl = routing.location.pathname + "&" + qs.stringify(filtering);
  dispatch(push(newUrl));
};

/*const programsService = {
  getPrograms,
  isLocationChanged
};*/
//export default programsService;
