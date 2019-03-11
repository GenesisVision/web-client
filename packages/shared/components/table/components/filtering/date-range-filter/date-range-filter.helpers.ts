import * as moment from "moment";

import { FILTER_TYPE } from "../../../helpers/filtering.helpers";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME,
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";
import { IComposeDefaultFilter } from "../../table.types";
import { DurationInputArg2 } from "moment";

export const validateDateRange = (value: IDataRangeFilterValue): boolean => {
  if (
    !value.type ||
    !Object.values(DATA_RANGE_FILTER_TYPES).includes(value.type)
  )
    return false;
  if (value.type === DATA_RANGE_FILTER_TYPES.CUSTOM) {
    const start = moment(value.dateStart);
    const end = moment(value.dateEnd);
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) return false;
  }
  return true;
};

const dateFrom = (
  subtract: DurationInputArg2,
  date: moment.MomentInput = new Date()
): string =>
  moment(date)
    .subtract(1, subtract)
    .startOf("minute")
    .toISOString();

const dateTo = (): string =>
  moment()
    .add(1, "minute")
    .startOf("minute")
    .toISOString();

export const composeRequestValueFunc = (
  fromFilterName: string = SERVER_DATE_RANGE_MIN_FILTER_NAME,
  toFilterName: string = SERVER_DATE_RANGE_MAX_FILTER_NAME
) => (value: IDataRangeFilterValue): Object => {
  switch (value.type) {
    case DATA_RANGE_FILTER_TYPES.ALL:
      return {
        [fromFilterName]: dateFrom(null, 20181001),
        [toFilterName]: dateTo()
      };
    case DATA_RANGE_FILTER_TYPES.LAST_MOUTH:
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
        [fromFilterName]: moment(value.dateStart)
          .startOf("day")
          .toISOString(),
        [toFilterName]: moment(value.dateEnd)
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
