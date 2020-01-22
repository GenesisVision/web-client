import { composeFilters } from "components/table/helpers/filtering.helpers";
import { calculateSkipAndTake } from "components/table/helpers/paging.helpers";
import { IDataModel } from "constants/constants";
import * as qs from "qs";
import { FAVORITES_TAB_NAME } from "routes/invest.routes";
import programApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import { NextPageWithReduxContext } from "utils/types";

import { FetchProgramsFiltersType } from "../actions/programs-table.actions";
import {
  DEFAULT_PROGRAM_TABLE_FILTERS,
  PROGRAMS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "../components/programs-table/programs.constants";

const DEFAULT_ITEMS_ON_PAGE = 12;

export const fetchPrograms = (
  filters: any //FetchProgramsFiltersType TODO
): Promise<IDataModel> => {
  return programApi.getPrograms({
    ...filters,
    authorization: authService.getAuthArg()
  });
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
