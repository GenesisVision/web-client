import {
  ComposeFiltersAllType,
  TFilter
} from "components/table/components/filtering/filter.type";
import { composeFilters } from "components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages,
  IPaging
} from "components/table/helpers/paging.helpers";
import { getSortingColumnName } from "components/table/helpers/sorting.helpers";
import { push } from "connected-react-router";
import { CancelablePromise } from "gv-api-web";
import * as qs from "qs";
import { RootState } from "reducers/root-reducer";
import { FAVORITES_TAB_NAME } from "routes/invest.routes";
import {
  PROGRAM_SLUG_URL_PARAM_NAME,
  PROGRAMS_FACET_ROUTE,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "routes/programs.routes";
import programApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import { IDataModel } from "shared/constants/constants";
import getParams from "shared/utils/get-params";
import { NextPageWithReduxContext } from "utils/types";

import * as programTableActions from "../actions/programs-table.actions";
import { FetchProgramsFiltersType } from "../actions/programs-table.actions";
import {
  DEFAULT_PROGRAM_TABLE_FILTERS,
  PROGRAMS_COLUMNS,
  PROGRAMS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "../components/programs-table/programs.constants";

const DEFAULT_ITEMS_ON_PAGE = 12;

const sortableColums = PROGRAMS_COLUMNS.filter(
  x => x.sortingName !== undefined
).map(x => x.sortingName);

export const getPrograms = (filters: ComposeFiltersAllType) => (
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
  dispatch(programTableActions.fetchProgramsAction(requestFilters));
};

export const fetchPrograms = (
  filters: any //FetchProgramsFiltersType TODO
): CancelablePromise<IDataModel> => {
  return programApi.getPrograms({
    ...filters,
    authorization: authService.getAuthArg()
  });
};

const composeRequestFilters = () => (
  dispatch: any,
  getState: any
): ComposeFiltersAllType => {
  let itemsOnPage = DEFAULT_ITEMS_ON_PAGE;
  const existingFilters = dispatch(getProgramsFilters());
  let { page } = existingFilters;

  const { router } = getState();
  const { currency } = getState().accountSettings;

  let filters: { [keys: string]: any } = { currency: currency };

  const { tab } = getParams(router.location.pathname, PROGRAMS_TAB_ROUTE);
  if (tab === PROGRAMS_FAVORITES_TAB_NAME) {
    filters.isFavorite = true;
  }

  const facetId = getParams(router.location.pathname, PROGRAMS_FACET_ROUTE)[
    PROGRAM_SLUG_URL_PARAM_NAME
  ];
  if (facetId) {
    filters.facetId = facetId;
    itemsOnPage = 100;
    page = 1;
  }

  const { skip, take } = calculateSkipAndTake({
    itemsOnPage: itemsOnPage,
    currentPage: page
  } as IPaging);

  const filtering = composeFilters(
    PROGRAMS_TABLE_FILTERS,
    existingFilters.filtering
  );

  return {
    ...filters,
    skip,
    take,
    sorting: existingFilters.sorting,
    ...filtering
  };
};

export const getProgramsFilters = () => (
  dispatch: any,
  getState: () => RootState
): ComposeFiltersAllType => {
  /*const { router, programsData } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));

  let pages = 0;
  let page = +queryParams.page || 1;
  if (programsData.items && programsData.items.data) {
    pages = calculateTotalPages(
      programsData.items.data.total,
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

  const filtering = PROGRAMS_TABLE_FILTERS.reduce((accum: any, cur: any) => {
    // TODO fix any types
    const { name, defaultValue, validate = (value: any) => true } = cur; // TODO fix any types
    if (!queryParams[name] || !validate(queryParams[name])) {
      accum[name] = defaultValue;
    } else {
      accum[name] = queryParams[name];
    }
    return accum;
  }, {});
*/
  return {
    /*    page,
    pages,
    sorting,
    filtering,
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE*/
  };
};

export const programsChangePage = (nextPage: number) => (
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

export const programsChangeSorting = (sorting: string) => (
  dispatch: any,
  getState: any
) => {
  const { router } = getState();
  const queryParams = qs.parse(router.location.search.slice(1));
  queryParams.sorting = sorting;
  const newUrl = router.location.pathname + "?" + qs.stringify(queryParams);
  dispatch(push(newUrl));
};

export const programsChangeFilter = (filter: TFilter<any>) => (
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

export const getFiltersFromContext = ({
  asPath = "",
  pathname,
  reduxStore
}: NextPageWithReduxContext): FetchProgramsFiltersType => {
  const showFavorites = pathname.includes(FAVORITES_TAB_NAME);
  const {
    page,
    sorting = SORTING_FILTER_VALUE,
    dateRange = {},
    ...other
  } = qs.parse(asPath.slice(pathname.length + 1));
  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });
  return {
    ...skipAndTake,
    ...composeFilters(PROGRAMS_TABLE_FILTERS, {
      ...DEFAULT_PROGRAM_TABLE_FILTERS,
      ...other
    }),
    dateFrom: dateRange.dateStart,
    dateTo: dateRange.dateEnd,
    sorting,
    showFavorites
  } as FetchProgramsFiltersType;
};
