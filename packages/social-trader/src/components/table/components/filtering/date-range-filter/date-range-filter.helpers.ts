import dayjs from "dayjs";
import { dateFrom, dateTo } from "utils/dates";

import { FILTER_TYPE } from "../../../helpers/filtering.helpers";
import { IComposeDefaultFilter } from "../../table.types";
import {
  ComposedRequestDataRangeValue,
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_FILTER_NAME,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  IDataRangeFilterValue,
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "./date-range-filter.constants";

export const mapServerTimeFrameToFilterType = (
  timeFrame: any // TODO add timeFrame type
): DATA_RANGE_FILTER_TYPES => {
  switch (timeFrame) {
    case "Week":
      return DATA_RANGE_FILTER_TYPES.LAST_WEEK;
    case "Month":
      return DATA_RANGE_FILTER_TYPES.LAST_MONTH;
    case "AllTime":
    default:
      return DATA_RANGE_FILTER_TYPES.ALL;
  }
};

export const validateDateRange = (value: IDataRangeFilterValue): boolean => {
  if (
    !value.type ||
    !Object.values(DATA_RANGE_FILTER_TYPES).includes(value.type)
  )
    return false;
  if (value.type === DATA_RANGE_FILTER_TYPES.CUSTOM) {
    const start = dayjs(value[DATE_RANGE_MIN_FILTER_NAME]);
    const end = dayjs(value[DATE_RANGE_MAX_FILTER_NAME]);
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) return false;
  }
  return true;
};

export const dateToInput = (date?: Date | number | string) =>
  dayjs(date).format("YYYY-MM-DD");

export const composeRequestValueFunc = (
  fromFilterName: string = SERVER_DATE_RANGE_MIN_FILTER_NAME,
  toFilterName: string = SERVER_DATE_RANGE_MAX_FILTER_NAME
) => (value: IDataRangeFilterValue): ComposedRequestDataRangeValue => {
  switch (value.type) {
    case DATA_RANGE_FILTER_TYPES.ALL:
      return {
        [fromFilterName]: dateFrom(undefined, 20181001),
        [toFilterName]: dateTo()
      };
    case DATA_RANGE_FILTER_TYPES.LAST_MONTH:
      return {
        [fromFilterName]: dateFrom("month"),
        [toFilterName]: dateTo()
      };
    case DATA_RANGE_FILTER_TYPES.LAST_WEEK:
      return {
        [fromFilterName]: dateFrom("week"),
        [toFilterName]: dateTo()
      };
    case DATA_RANGE_FILTER_TYPES.CUSTOM:
    default:
      return {
        [fromFilterName]: dayjs(value[DATE_RANGE_MIN_FILTER_NAME])
          .startOf("day")
          .toISOString(),
        [toFilterName]: dayjs(value[DATE_RANGE_MAX_FILTER_NAME])
          .add(1, "day")
          .startOf("day")
          .toISOString()
      };
  }
};

export const composeDefaultDateRangeFilter = ({
  name = DATE_RANGE_FILTER_NAME,
  type = FILTER_TYPE.CUSTOM,
  defaultValue = DEFAULT_DATE_RANGE_FILTER_VALUE,
  composeApiRequestValue
}: IComposeDefaultFilter = {}): IComposeDefaultFilter => ({
  name,
  type,
  composeRequestValue: composeApiRequestValue || composeRequestValueFunc(),
  defaultValue
});
