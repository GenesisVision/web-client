import { push } from "connected-react-router";
import {
  FUNDS_FACET_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "pages/funds/funds.routes";
import * as qs from "qs";
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
  DEFAULT_ITEMS_ON_PAGE,
  FUNDS_TABLE_FILTERS,
  sortableColumns,
  SORTING_FILTER_VALUE
} from "../components/funds-table/funds-table.constants";
import { FundsList } from "gv-api-web";
import {
  ComposeFiltersAllType,
  TFilter
} from "shared/components/table/components/filtering/filter.type";

export const getFunds = (filters: ComposeFiltersAllType) => (
  dispatch: any // temp to declare Dispatch type
) => {
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

export const fetchFunds = (
  filters: ComposeFiltersAllType
): Promise<FundsList> => {
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  return fundsTableActions.fetchFunds(filters).payload;
};

const composeRequestFilters = () => (
  dispatch: any,
  getState: any
): ComposeFiltersAllType => {
  let itemsOnPage = DEFAULT_ITEMS_ON_PAGE;
  const existingFilters = dispatch(getFundsFilters());
  let { page } = existingFilters;

  const { router } = getState();
  const { currency } = getState().accountSettings;

  let filters: ComposeFiltersAllType = { currencySecondary: currency };

  const { tab } = getParams(router.location.pathname, FUNDS_TAB_ROUTE);
  if (tab === FUNDS_FAVORITES_TAB_NAME) {
    filters.isFavorite = true;
  }

  const { facetId } = getParams(router.location.pathname, FUNDS_FACET_ROUTE);
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

export const getFundsFilters = () => (
  dispatch: any,
  getState: any
): ComposeFiltersAllType => {
  const { router, fundsData } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));

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
  const sorting = sortableColumns.includes(sortingName)
    ? queryParams.sorting
    : SORTING_FILTER_VALUE;

  const filtering = FUNDS_TABLE_FILTERS.reduce((accum: any, cur: any) => {
    const { name, defaultValue, validate = () => true } = cur;
    if (name && (!queryParams[name] || !validate(queryParams[name]))) {
      accum[name] = defaultValue;
    } else {
      accum[name] = queryParams[name];
    }
    return accum;
  }, {});

  return {
    page,
    pages,
    sorting,
    filtering,
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE
  };
};

export const fundsChangePage = (nextPage: number) => (
  dispatch: any,
  getState: any
) => {
  const { router } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));
  const page = nextPage + 1 || 1;
  queryParams.page = page;
  const newUrl = router.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};

export const fundsChangeSorting = (sorting: string) => (
  dispatch: any,
  getState: any
) => {
  const { router } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));
  queryParams.sorting = sorting;
  const newUrl = router.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};

export const fundsChangeFilter = (filter: TFilter<any>) => (
  dispatch: any,
  getState: any
) => {
  const { router } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));
  if (filter.value === undefined) {
    delete queryParams[filter.name];
  } else {
    queryParams[filter.name] = filter.value;
  }
  if (queryParams.page) {
    delete queryParams.page;
  }
  const newUrl = router.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};
