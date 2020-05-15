import { ComposedRequestAssetValue } from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import {
  FilteringType,
  SelectFilterValue,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import { IComposeDefaultFilter } from "components/table/components/table.types";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";

export const USERS_TABLE_COLUMNS: SortingColumn[] = [
  { name: "name", sortingName: "byName" },
  { name: "followers", sortingName: "byFollowers" },
  { name: "age", sortingName: "byAge" },
  { name: "aum", sortingName: "byAum" },
  { name: "investors", sortingName: "byInvestors" },
  { name: "profit", sortingName: "byProfit" }
];

export const USERS_DATE_RANGE_FILTER_NAME = "timeframe";
export const USERS_DATE_RANGE_DEFAULT_VALUE = "Month";
export const USERS_DATE_RANGE_VALUES: SelectFilterValue<string>[] = [
  { label: "Month", value: "Month" },
  { label: "Week", value: "Week" },
  { label: "Day", value: "Day" }
];

export const composeDefaultUsersDateRangeFilter = (): IComposeDefaultFilter => ({
  name: USERS_DATE_RANGE_FILTER_NAME,
  composeRequestValue: (value): ComposedRequestAssetValue => value,
  defaultValue: USERS_DATE_RANGE_DEFAULT_VALUE,
  type: FILTER_TYPE.GENERAL
});

export const USERS_TABLE_FILTERS: IComposeDefaultFilter[] = [
  {
    ...composeDefaultUsersDateRangeFilter()
  }
];

export const USERS_TABLE_DEFAULT_FILTERING: FilteringType = {
  [USERS_DATE_RANGE_FILTER_NAME]: USERS_DATE_RANGE_DEFAULT_VALUE
};
