import {
  ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeRequestValueFunc } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { composeFilters } from "components/table/helpers/filtering.helpers";
import { calculateSkipAndTake } from "components/table/helpers/paging.helpers";
import { IDataModel } from "constants/constants";
import * as qs from "qs";
import { FAVORITES_TAB_NAME } from "routes/invest.routes";
import { api } from "services/api-client/swagger-custom-client";
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
  return api.programs().getPrograms(filters);
};

export const getFiltersFromContext = ({
  asPath = "",
  pathname
}: NextPageWithReduxContext): FetchProgramsFiltersType => {
  const showFavorites = pathname.includes(FAVORITES_TAB_NAME);
  const {
    page,
    sorting = SORTING_FILTER_VALUE,
    dateRange = ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
    ...other
  } = qs.parse(asPath.slice(pathname.length + 1));
  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });
  const dateRangeValues = composeRequestValueFunc(
    DATE_RANGE_MIN_FILTER_NAME,
    DATE_RANGE_MAX_FILTER_NAME
  )(dateRange);
  return {
    ...skipAndTake,
    ...composeFilters(PROGRAMS_TABLE_FILTERS, {
      ...DEFAULT_PROGRAM_TABLE_FILTERS,
      ...other
    }),
    ...dateRangeValues,
    sorting,
    showFavorites
  } as FetchProgramsFiltersType;
};
