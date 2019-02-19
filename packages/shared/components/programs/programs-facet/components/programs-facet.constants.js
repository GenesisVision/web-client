import {
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  DateRangeFilterTypes
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { programsDateRangeFilter } from "shared/modules/programs-table/components/programs-table/programs.constants";

export const PROGRAMS_FACET_TABLE_FILTERING = {
  dateRange: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DateRangeFilterTypes.lastMonth
  }
};

export const PROGRAMS_FACET_TABLE_FILTERS = [programsDateRangeFilter];

export const PROGRAMS_FACET_TABLE_SORTING = "ByProfitDesc";
export const PROGRAMS_FACET_PAGING = { ...DEFAULT_PAGING, itemsOnPage: 12 };
