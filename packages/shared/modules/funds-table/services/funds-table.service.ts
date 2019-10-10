import { push } from "connected-react-router";
import { FundsListOld } from "gv-api-web";
import * as qs from "qs";
import {
  ComposeFiltersAllType,
  TFilter
} from "shared/components/table/components/filtering/filter.type";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";
import { getSortingColumnName } from "shared/components/table/helpers/sorting.helpers";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import {
  FUNDS_FACET_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "shared/routes/funds.routes";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { MiddlewareDispatch } from "shared/utils/types";

import * as fundsTableActions from "../actions/funds-table.actions";
import {
  DEFAULT_ITEMS_ON_PAGE,
  FUNDS_TABLE_FILTERS,
  SORTING_FILTER_VALUE,
  sortableColumns
} from "../components/funds-table/funds-table.constants";

export type GetFundsType = () => (dispatch: MiddlewareDispatch) => void;
export const getFunds: GetFundsType = () => dispatch => {
  let requestFilters = dispatch(composeRequestFilters());
  if (authService.getAuthArg()) {
    requestFilters.authorization = authService.getAuthArg();
  }
  dispatch(fundsTableActions.fetchFundsAction(requestFilters));
};

export type FetchFundsType = (
  filters: ComposeFiltersAllType
) => Promise<FundsListOld>;
export const fetchFunds: FetchFundsType = filters => {
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  return fundsTableActions.fetchFundsAction(filters).payload!;
};

const composeRequestFilters = () => (
  dispatch: any,
  getState: any
): ComposeFiltersAllType => {
  let itemsOnPage = DEFAULT_ITEMS_ON_PAGE;
  const existingFilters = dispatch(getFundsFilters());
  let { currentPage } = existingFilters.paging;

  const { router } = getState();
  const { currency } = getState().accountSettings;

  let filters: ComposeFiltersAllType = { currency: currency };

  const { tab } = getParams(router.location.pathname, FUNDS_TAB_ROUTE);
  if (tab === FUNDS_FAVORITES_TAB_NAME) {
    filters.isFavorite = true;
  }

  const { facetId } = getParams(router.location.pathname, FUNDS_FACET_ROUTE);
  if (facetId) {
    filters.facet = facetId;
    itemsOnPage = 100;
    currentPage = 1;
  }

  const { skip, take } = calculateSkipAndTake({
    itemsOnPage,
    currentPage
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

export type GetFundsFiltersType = () => (
  dispatch: any,
  getState: any
) => ComposeFiltersAllType;
export const getFundsFilters: GetFundsFiltersType = () => (
  dispatch,
  getState
) => {
  const { router, fundsData } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));

  let totalPages = 0;
  let currentPage = +queryParams.page || 1;
  if (fundsData.items && fundsData.items.data) {
    totalPages = calculateTotalPages(
      fundsData.items.data.total,
      DEFAULT_ITEMS_ON_PAGE
    );
    if (currentPage > totalPages) {
      currentPage = totalPages;
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

  if (!filtering.currency) {
    filtering.currency = currencySelector(getState());
  }

  return {
    paging: { currentPage, totalPages, itemsOnPage: DEFAULT_ITEMS_ON_PAGE },
    sorting,
    filtering
  };
};

export type FundsChangePageType = (
  nextPage: number
) => (dispatch: any, getState: any) => void;
export const fundsChangePage: FundsChangePageType = nextPage => (
  dispatch,
  getState
) => {
  const { router } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));
  const page = nextPage + 1 || 1;
  queryParams.page = page;
  const newUrl = router.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};

export type FundsChangeSortingType = (
  sorting: string
) => (dispatch: any, getState: any) => void;
export const fundsChangeSorting: FundsChangeSortingType = sorting => (
  dispatch,
  getState
) => {
  const { router } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));
  queryParams.sorting = sorting;
  const newUrl = router.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};

export type FundsChangeFilterType = (
  filter: TFilter<any>
) => (dispatch: any, getState: any) => void;
export const fundsChangeFilter: FundsChangeFilterType = filter => (
  dispatch,
  getState
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
