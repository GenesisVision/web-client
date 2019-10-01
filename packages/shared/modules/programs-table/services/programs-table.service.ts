import { push } from "connected-react-router";
import { CancelablePromise } from "gv-api-web";
import * as qs from "qs";
import {
  ComposeFiltersAllType,
  TFilter
} from "shared/components/table/components/filtering/filter.type";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  IPaging,
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";
import { getSortingColumnName } from "shared/components/table/helpers/sorting.helpers";
import { IDataModel } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";
import {
  PROGRAMS_FACET_ROUTE,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME
} from "shared/routes/programs.routes";
import programApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";

import * as programTableActions from "../actions/programs-table.actions";
import { FetchProgramsFiltersType } from "../actions/programs-table.actions";
import {
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
  filters: FetchProgramsFiltersType
): CancelablePromise<IDataModel> =>
  programApi
    .v10ProgramsGet({
      ...filters,
      authorization: authService.getAuthArg()
    })
    .then(data => ({
      total: data.total,
      items: data.programs
    }));

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
  const { router, programsData } = getState();
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

  return {
    page,
    pages,
    sorting,
    filtering,
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE
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
