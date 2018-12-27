import {
  FUNDS_FACET_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "pages/funds/funds.routes";
import qs from "qs";
import { push } from "react-router-redux";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";
import { getSortingColumnName } from "shared/components/table/helpers/sorting.helpers";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";

import * as fundsTableActions from "../actions/funds-table.actions";
import {
  FUNDS_TABLE_COLUMNS,
  FUNDS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "../components/funds-table/funds-table.constants";

const DEFAULT_ITEMS_ON_PAGE = 12;

const sortableColums = FUNDS_TABLE_COLUMNS.filter(
  x => x.sortingName !== undefined
).map(x => x.sortingName);

export const getFunds = filters => (dispatch, getState) => {
  let requestFilters = dispatch(composeRequestFilters());
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  requestFilters = {
    ...requestFilters,
    ...filters
  };
  dispatch(fundsTableActions.fetchFunds(requestFilters));
};

export const fetchFunds = filters => {
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  return fundsTableActions.fetchFunds(filters).payload;
};

const composeRequestFilters = () => (dispatch, getState) => {
  let itemsOnPage = DEFAULT_ITEMS_ON_PAGE;
  const existingFilters = dispatch(getFundsFilters());
  let { page } = existingFilters;

  const { routing } = getState();
  const { currency } = getState().accountSettings;

  let filters = { currencySecondary: currency };

  const { tab } = getParams(routing.location.pathname, FUNDS_TAB_ROUTE);
  if (tab === FUNDS_FAVORITES_TAB_NAME) {
    filters.isFavorite = true;
  }

  const { facetId } = getParams(routing.location.pathname, FUNDS_FACET_ROUTE);
  if (facetId) {
    filters.facet = facetId;
    itemsOnPage = 100;
    page = 1;
  }

  const { skip, take } = calculateSkipAndTake({
    itemsOnPage: itemsOnPage,
    currentPage: page
  });

  const filtering = composeFilters(
    FUNDS_TABLE_FILTERS,
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

export const getFundsFilters = () => (dispatch, getState) => {
  const { routing, fundsData } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));

  let pages = 0;
  let page = +queryParams.page || 1;
  if (fundsData.items && fundsData.items.data) {
    pages = calculateTotalPages(
      fundsData.items.data.total,
      DEFAULT_ITEMS_ON_PAGE
    );
    if (page > pages) {
      page = pages;
    }
  }

  const sortingName = getSortingColumnName(queryParams.sorting || "");
  const sorting = sortableColums.includes(sortingName)
    ? queryParams.sorting
    : SORTING_FILTER_VALUE;

  const filtering = FUNDS_TABLE_FILTERS.reduce((accum, cur) => {
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
    filtering,
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE
  };
  return filters;
};

export const fundsChangePage = nextPage => (dispatch, getState) => {
  const { routing } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  const page = nextPage + 1 || 1;
  queryParams.page = page;
  const newUrl = routing.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};

export const fundsChangeSorting = sorting => (dispatch, getState) => {
  const { routing } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  queryParams.sorting = sorting;
  const newUrl = routing.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};

export const fundsChangeFilter = filter => (dispatch, getState) => {
  const { routing } = getState();
  const queryParams = qs.parse(routing.location.search.slice(1));
  if (filter.value === undefined) {
    delete queryParams[filter.name];
  } else {
    queryParams[filter.name] = filter.value;
  }
  if (queryParams.page) {
    delete queryParams.page;
  }
  const newUrl = routing.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};
