import {
  addDays,
  addMinutes,
  isAfter,
  isValid,
  startOfDay,
  startOfMinute,
  subMonths,
  subWeeks
} from "date-fns";
import { ProgramFacetTimeframeEnum } from "gv-api-web";

import { FILTER_TYPE } from "../../../helpers/filtering.helpers";
import { IComposeDefaultFilter } from "../../table.types";
import {
  ComposedRequestDataRangeValue,
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  IDataRangeFilterValue,
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "./date-range-filter.constants";

export const mapServerTimeFrameToFilterType = (
  timeFrame: ProgramFacetTimeframeEnum
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
    if (value.dateStart === undefined || value.dateEnd === undefined)
      return false;
    const start = new Date(value.dateStart);
    const end = new Date(value.dateEnd);
    if (!isValid(start) || !isValid(end) || isAfter(start, end)) return false;
  }
  return true;
};

const dateFrom = (
  subtract?: "month" | "week",
  date: Date | string | number = new Date()
): string => {
  switch (subtract) {
    case "month":
      return startOfMinute(subMonths(new Date(date), 1)).toISOString();
    case "week":
      return startOfMinute(subWeeks(new Date(date), 1)).toISOString();
    default:
      return startOfMinute(new Date(date)).toISOString();
  }
};

const dateTo = (): string =>
  startOfMinute(addMinutes(new Date(), 1)).toISOString();

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
        [fromFilterName]: startOfDay(
          value.dateStart ? new Date(value.dateStart) : new Date()
        ).toISOString(),
        [toFilterName]: startOfDay(
          addDays(value.dateEnd ? new Date(value.dateEnd) : new Date(), 1)
        ).toISOString()
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
