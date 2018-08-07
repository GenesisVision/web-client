import {
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "pages/programs/program.routes";
import { matchPath } from "react-router-dom";
import authService from "services/auth-service";

import programActions from "../actions/programs-actions";

const getPrograms = () => (dispatch, getState) => {
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

const isLocationChanged = (prev, curr) => {
  return JSON.stringify(prev) !== JSON.stringify(curr);
};

const programsService = {
  getPrograms,
  isLocationChanged
};
export default programsService;
