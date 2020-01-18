import {
  ComposeFiltersAllType,
  TFilter
} from "components/table/components/filtering/filter.type";
import { composeFilters } from "components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "components/table/helpers/paging.helpers";
import { getSortingColumnName } from "components/table/helpers/sorting.helpers";
import { push } from "connected-react-router";
import { ItemsViewModelFundDetailsListItem } from "gv-api-web";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import * as qs from "qs";
import { currencySelector } from "reducers/account-settings-reducer";
import {
  FUNDS_FACET_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "routes/funds.routes";
import { FAVORITES_TAB_NAME } from "routes/invest.routes";
import fundsApi from "services/api-client/funds-api";
import authService from "services/auth-service";
import { getCookie } from "utils/cookie";
import getParams from "utils/get-params";
import {
  CurrencyEnum,
  MiddlewareDispatch,
  NextPageWithReduxContext
} from "utils/types";

import * as fundsTableActions from "../actions/funds-table.actions";
import {
  DEFAULT_FUND_TABLE_FILTERS,
  DEFAULT_ITEMS_ON_PAGE,
  FUNDS_TABLE_FILTERS,
  sortableColumns,
  SORTING_FILTER_VALUE
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
) => Promise<ItemsViewModelFundDetailsListItem>;
export const fetchFunds: FetchFundsType = filters => {
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  return fundsApi.getFunds(filters);
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

export const getFiltersFromContext = (ctx: NextPageWithReduxContext) => {
  const showFavorites = ctx.pathname.includes(FAVORITES_TAB_NAME);
  const { asPath = "", pathname, reduxStore } = ctx;
  const {
    page,
    sorting = SORTING_FILTER_VALUE,
    dateRange = {},
    showIn,
    ...other
  } = qs.parse(asPath.slice(pathname.length + 1));
  const accountCurrency =
    (getCookie(ACCOUNT_CURRENCY_KEY, ctx) as CurrencyEnum) ||
    reduxStore.getState().accountSettings.currency;

  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });

  return {
    ...composeFilters(FUNDS_TABLE_FILTERS, {
      ...DEFAULT_FUND_TABLE_FILTERS,
      ...other
    }),
    ...skipAndTake,
    dateFrom: dateRange.dateStart,
    dateTo: dateRange.dateEnd,
    showIn: showIn || accountCurrency,
    sorting,
    showFavorites
  };
};
