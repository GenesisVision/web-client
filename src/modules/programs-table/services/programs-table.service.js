import { composeFilters } from "modules/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "modules/table/helpers/paging.helpers";
import { getSortingColumnName } from "modules/table/helpers/sorting.helpers";
import {
  PROGRAMS_FACET_ROUTE,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "pages/programs/programs.routes";
import qs from "qs";
import { push } from "react-router-redux";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import * as programTableActions from "../actions/programs-table.actions";
import {
  PROGRAMS_COLUMNS,
  PROGRAMS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "../programs.constants";

const sortableColums = PROGRAMS_COLUMNS.filter(
  x => x.sortingName !== undefined
).map(x => x.sortingName);

export const getPrograms = () => (dispatch, getState) => {
  const requestFilters = dispatch(composeRequestFilters());
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  dispatch(programTableActions.fetchPrograms(requestFilters));
};

const composeRequestFilters = () => (dispatch, getState) => {
  let itemsOnPage = 10;
  const existingFilters = dispatch(getProgramsFilters());
  let { page } = existingFilters;
  let filters = {};

  const { routing } = getState();
  const { tab } = getParams(routing.location.pathname, PROGRAMS_TAB_ROUTE);
  if (tab === PROGRAMS_FAVORITES_TAB_NAME) {
    filters.isFavorite = true;
  }

  const { facetId } = getParams(
    routing.location.pathname,
    PROGRAMS_FACET_ROUTE
  );
  if (facetId) {
    filters.facet = facetId;
    itemsOnPage = 100;
    page = 1;
  }

  const { skip, take } = calculateSkipAndTake({
    itemsOnPage: itemsOnPage,
    currentPage: page - 1
  });

  const filtering = composeFilters(
    PROGRAMS_TABLE_FILTERS,
    existingFilters.filtering
  );

  filters = {
    ...filters,
    skip,
    take,
    sorting: existingFilters.sorting,
    ...filtering
  };

  return filters;
};

export const getProgramsFilters = () => (dispatch, getState) => {
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

  const filtering = PROGRAMS_TABLE_FILTERS.reduce((accum, cur) => {
    const { name, defaultValue, validate = value => true } = cur;
    if (!queryParams[name] || !validate(queryParams[name])) {
      accum[name] = defaultValue;
    } else {
      accum[name] = queryParams[name];
    }
    return accum;
  }, {});

  const filters = {
    page,
    pages,
    sorting,
    filtering
  };
  return filters;
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

export const programsChangeFilter = filter => (dispatch, getState) => {
  const { routing } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  if (filter.value === undefined) {
    delete queryParams[filter.name];
  } else {
    queryParams[filter.name] = filter.value;
  }
  const newUrl = routing.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};
