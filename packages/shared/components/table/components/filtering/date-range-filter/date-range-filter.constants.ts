import { Nullable } from "shared/utils/types";

export const DATE_RANGE_FILTER_NAME = "dateRange";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "from";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "to";

export type SERVER_DATE_NAME = "from" | "to" | "dateFrom" | "dateTo";

export const DateRangeFilterTypes = {
  all: "all",
  lastMonth: "lastMonth",
  lastWeek: "lastWeek",
  custom: "custom"
};
export enum DATA_RANGE_FILTER_TYPES {
  ALL = "all",
  LAST_MOUTH = "lastMonth",
  LAST_WEEK = "lastWeek",
  CUSTOM = "custom"
}

export interface IDataRangeFilterValue {
  type: DATA_RANGE_FILTER_TYPES;
  dateStart: Nullable<Date | number | string>;
  dateEnd: Nullable<Date | number | string>;
}

export const DEFAULT_DATE_RANGE_FILTER_VALUE: IDataRangeFilterValue = {
  type: DATA_RANGE_FILTER_TYPES.ALL,
  dateStart: null,
  dateEnd: null
};

export type DateRangeFilterType = IDataRangeFilterValue;

export type ComposedRequestDataRangeNames = SERVER_DATE_NAME;
export type ComposedRequestDataRangeValues = string | Date;
export type ComposedRequestDataRangeValue = {
  [key in SERVER_DATE_NAME]?: ComposedRequestDataRangeValues
};
