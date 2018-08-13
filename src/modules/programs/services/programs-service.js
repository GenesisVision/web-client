import {
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "pages/programs/program.routes";
import qs from "qs";
import { matchPath } from "react-router-dom";
import { push } from "react-router-redux";
import authService from "services/auth-service";

import { calculateTotalPages } from "../../paging/helpers/paging-helpers";
import programActions from "../actions/programs-actions";
import { PROGRAMS_COLUMNS, SORTING_FILTER_VALUE } from "../programs.constants";

const sortableColums = PROGRAMS_COLUMNS.filter(x => x.isSortable).map(
  x => x.name
);

export const getPrograms = () => (dispatch, getState) => {
  const { routing } = getState();
  const filters = composeQueryParams(routing.location);
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  dispatch(programActions.fetchPrograms(filters));
};

const composeQueryParams = location => {
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

export const getProgramsFiltering = () => (dispatch, getState) => {
  const { routing, programsData } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  const page = +queryParams.page || 1;
  let pages = 0;
  if (programsData.items && programsData.items.data) {
    pages = calculateTotalPages(programsData.items.data.total, 10);
  }

  const sorting = sortableColums.includes(queryParams.sorting)
    ? queryParams.sorting
    : SORTING_FILTER_VALUE;

  const filtering = {
    page,
    pages,
    sorting: sorting
  };
  return filtering;
};

export const programsChangePage = nextPage => (dispatch, getState) => {
  const { routing } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  const page = nextPage + 1 || 1;
  queryParams.page = page;
  const newUrl = routing.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};
