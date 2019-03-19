import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc,
  validateDateRange
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import {
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "shared/modules/funds-table/components/funds-table/funds-table.constants";

import { DateRangeFilterTypes } from "../table/components/filtering/date-range-filter/date-range-filter.constants";

export const MANAGER_TABLE_DATE_RANGE_FILTER = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      SERVER_DATE_RANGE_MIN_FILTER_NAME,
      SERVER_DATE_RANGE_MAX_FILTER_NAME
    )
  }),
  validate: validateDateRange
};

export const MANAGER_DEFAULT_FILTERS = [MANAGER_TABLE_DATE_RANGE_FILTER];
export const MANAGER_FILTERING = {
  [DATE_RANGE_FILTER_NAME]: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DateRangeFilterTypes.all
  }
};

export const MANAGER_SORTING = "ByProfitDesc";

export enum MANAGER_HISTORY_TAB {
  PROGRAMS = "programs",
  FUNDS = "funds"
}
