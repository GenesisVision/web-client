import { dateFrom, dateTo } from "utils/dates";

export const DATE_RANGE_FILTER_NAME = "dateRange";

export const SERVER_STATISTIC_DATE_RANGE_MIN_FILTER_NAME = "statisticDateFrom";
export const SERVER_STATISTIC_DATE_RANGE_MAX_FILTER_NAME = "statisticDateTo";

export const DATE_RANGE_MIN_FILTER_NAME = "dateFrom";
export const DATE_RANGE_MAX_FILTER_NAME = "dateTo";

export type SERVER_DATE_NAME =
  | "from"
  | "to"
  | "dateFrom"
  | "dateTo"
  | "statisticDateFrom"
  | "statisticDateTo";

export enum DATA_RANGE_FILTER_TYPES {
  ALL = "all",
  LAST_MONTH = "lastMonth",
  LAST_WEEK = "lastWeek",
  CUSTOM = "custom"
}

export interface IDataRangeFilterValue {
  type: DATA_RANGE_FILTER_TYPES;
  [DATE_RANGE_MIN_FILTER_NAME]?: string;
  [DATE_RANGE_MAX_FILTER_NAME]?: string;
}

export const ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE: IDataRangeFilterValue = {
  type: DATA_RANGE_FILTER_TYPES.LAST_MONTH,
  [DATE_RANGE_MIN_FILTER_NAME]: dateFrom("month"),
  [DATE_RANGE_MAX_FILTER_NAME]: dateTo()
};

export const DEFAULT_DATE_RANGE_FILTER_VALUE: IDataRangeFilterValue = {
  type: DATA_RANGE_FILTER_TYPES.ALL,
  [DATE_RANGE_MIN_FILTER_NAME]: undefined,
  [DATE_RANGE_MAX_FILTER_NAME]: undefined
};

export type DateRangeFilterType = IDataRangeFilterValue;

export type ComposedRequestDataRangeNames = SERVER_DATE_NAME;
export type ComposedRequestDataRangeValues = string | Date;
export type ComposedRequestDataRangeValue = {
  [key in SERVER_DATE_NAME]?: ComposedRequestDataRangeValues;
};
