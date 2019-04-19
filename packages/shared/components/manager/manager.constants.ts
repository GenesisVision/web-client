import {
  DATE_RANGE_FILTER_NAME,
  DATE_RANGE_FILTER_TYPE,
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

export const MANAGER_TABLE_DATE_RANGE_FILTER = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      SERVER_DATE_RANGE_MIN_FILTER_NAME,
      SERVER_DATE_RANGE_MAX_FILTER_NAME
    )
  }),
  validate: validateDateRange
};

export const MANAGER_DEFAULT_FILTERS: any = [MANAGER_TABLE_DATE_RANGE_FILTER];
export const MANAGER_FILTERING: any = {
  [DATE_RANGE_FILTER_NAME]: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DATE_RANGE_FILTER_TYPE.ALL
  }
};

export const MANAGER_SORTING = "ByProfitDesc";

export enum MANAGER_HISTORY_TAB {
  PROGRAMS = "programs",
  FUNDS = "funds"
}
