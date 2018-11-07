import moment from "moment";

import { FilterType } from "../../../helpers/filtering.helpers";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  DateRangeFilterTypes,
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "./date-range-filter.constants";

export const validateDateRange = value => {
  if (!value.type || !Object.values(DateRangeFilterTypes).includes(value.type))
    return false;

  if (value.type === DateRangeFilterTypes.custom) {
    const start = moment(value.dateStart);
    const end = moment(value.dateEnd);
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) return false;
  }

  return true;
};

const dateFrom = (substruct, date) => {
  date = date || new Date();
  return moment(date)
    .subtract(1, substruct)
    .startOf("minute")
    .toISOString();
};
const dateTo = () =>
  moment()
    .add(1, "minute")
    .startOf("minute")
    .toISOString();

export const composeRequestValue = (
  fromFilterName = SERVER_DATE_RANGE_MIN_FILTER_NAME,
  toFilterName = SERVER_DATE_RANGE_MAX_FILTER_NAME
) => value => {
  switch (value.type) {
    case DateRangeFilterTypes.all:
      return {
        [fromFilterName]: dateFrom(null, 20181001),
        [toFilterName]: dateTo()
      };
    case DateRangeFilterTypes.lastMonth:
      return {
        [fromFilterName]: dateFrom("month"),
        [toFilterName]: dateTo()
      };
    case DateRangeFilterTypes.lastWeek:
      return {
        [fromFilterName]: dateFrom("week"),
        [toFilterName]: dateTo()
      };
    case DateRangeFilterTypes.custom:
    default:
      return {
        [fromFilterName]: moment(value.dateStart)
          .startOf("day")
          .toISOString(),
        [toFilterName]: moment()
          .add(1, "day")
          .startOf("day")
          .toISOString()
      };
  }
};

export const composeDefaultDateRangeFilter = ({
  name = DATE_RANGE_FILTER_NAME,
  type = FilterType.custom,
  defaultValue = DEFAULT_DATE_RANGE_FILTER_VALUE,
  composeApiRequestValue = composeRequestValue()
} = {}) => ({
  name: name,
  type: type,
  composeRequestValue: composeApiRequestValue,
  defaultValue: defaultValue
});
