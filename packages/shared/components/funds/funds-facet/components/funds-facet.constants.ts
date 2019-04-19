import {
  DATE_RANGE_FILTER_NAME,
  DATE_RANGE_FILTER_TYPE,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  IDataRangeFilterValue
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { programsDateRangeFilter } from "shared/modules/programs-table/components/programs-table/programs.constants";

import { IDefaultFilters } from "../../../table/components/filtering/filter.type";

export type FUNDS_FACET_TABLE_REQUEST_FILTERS = {
  dateFrom: Date;
  fateTo: Date;
};

export type FUNDS_FACET_TABLE_FILTERS_TYPE = {
  [DATE_RANGE_FILTER_NAME]: IDataRangeFilterValue;
};
export const FUNDS_FACET_TABLE_DEFAULT_FILTERS: IDefaultFilters<
  FUNDS_FACET_TABLE_FILTERS_TYPE
> = [programsDateRangeFilter];

export const FUNDS_FACET_TABLE_FILTERS: FUNDS_FACET_TABLE_FILTERS_TYPE = {
  dateRange: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DATE_RANGE_FILTER_TYPE.LAST_MONTH
  }
};

export const FUNDS_FACET_TABLE_SORTING = "ByProfitDesc";
export const FUNDS_FACET_PAGING = { ...DEFAULT_PAGING, itemsOnPage: 12 };
