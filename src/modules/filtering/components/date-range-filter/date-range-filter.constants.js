export const DATE_RANGE_FILTER_NAME = "dateRange";

export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "from";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "to";
export const DateRangeFilterTypes = {
  all: "all",
  lastMonth: "lastMonth",
  lastWeek: "lastWeek",
  custom: "custom"
};

export const DEFAULT_DATE_RANGE_FILTER_VALUE = {
  type: DateRangeFilterTypes.all,
  dateStart: undefined,
  dateEnd: undefined
};
