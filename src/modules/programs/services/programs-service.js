import {
  calculateSkipAndTake,
  calculateTotalPages
} from "modules/paging/helpers/paging-helpers";
import {
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "pages/programs/programs.routes";
import qs from "qs";
import { matchPath } from "react-router-dom";
import { push } from "react-router-redux";
import authService from "services/auth-service";

import { getSortingColumnName } from "../../sorting/helpers/sorting-helpers";
import * as programActions from "../actions/programs-actions";
import { PROGRAMS_COLUMNS, SORTING_FILTER_VALUE } from "../programs.constants";

const sortableColums = PROGRAMS_COLUMNS.filter(
  x => x.sortingName !== undefined
).map(x => x.sortingName);

export const getPrograms = () => (dispatch, getState) => {
  const requestFilters = dispatch(composeRequestFilters());
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  dispatch(programActions.fetchPrograms(requestFilters));
};

const getParams = (pathname, route) => {
  const matchProfile = matchPath(pathname, {
    path: route
  });
  return (matchProfile && matchProfile.params) || {};
};

const composeRequestFilters = () => (dispatch, getState) => {
  const { routing } = getState();
  let filters = {};
  const { tab } = getParams(routing.location.pathname, PROGRAMS_TAB_ROUTE);
  if (tab === PROGRAMS_FAVORITES_TAB_NAME) {
    filters.isFavorite = true;
  }

  const existingFilters = dispatch(getProgramsFiltering());

  const { skip, take } = calculateSkipAndTake({
    itemsOnPage: 10,
    currentPage: existingFilters.page - 1
  });
  filters = {
    ...filters,
    skip,
    take,
    sorting: existingFilters.sorting
  };

  return filters;
};

export const getProgramsFiltering = () => (dispatch, getState) => {
  const { routing, programsData } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));

  let pages = 0;
  if (programsData.items && programsData.items.data) {
    pages = calculateTotalPages(programsData.items.data.total, 10);
  }
  let page = +queryParams.page || 1;
  if (page > pages) {
    page = 1;
  }

  const sortingName = getSortingColumnName(queryParams.sorting || "");
  const sorting = sortableColums.includes(sortingName)
    ? queryParams.sorting
    : SORTING_FILTER_VALUE;

  const filtering = {
    page,
    pages,
    sorting
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

export const programsChangeSorting = sorting => (dispatch, getState) => {
  const { routing } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  queryParams.sorting = sorting;
  const newUrl = routing.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};
