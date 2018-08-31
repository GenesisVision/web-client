import moment from "moment";
export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "statisticDateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "statisticDateTo";
export const DateRangeFilterTypes = {
  all: "all",
  lastMonth: "lastMonth",
  lastWeek: "lastWeek",
  custom: "custom"
};

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

export const composeRequestValue = value => {
  switch (value.type) {
    case DateRangeFilterTypes.all:
      return {
        [SERVER_DATE_RANGE_MIN_FILTER_NAME]: moment(20181001).toISOString(),
        [SERVER_DATE_RANGE_MAX_FILTER_NAME]: moment().toISOString()
      };
    case DateRangeFilterTypes.lastMonth:
      return {
        [SERVER_DATE_RANGE_MIN_FILTER_NAME]: moment()
          .subtract(1, "month")
          .toISOString(),
        [SERVER_DATE_RANGE_MAX_FILTER_NAME]: moment().toISOString()
      };
    case DateRangeFilterTypes.lastWeek:
      return {
        [SERVER_DATE_RANGE_MIN_FILTER_NAME]: moment()
          .subtract(1, "week")
          .toISOString(),
        [SERVER_DATE_RANGE_MAX_FILTER_NAME]: moment().toISOString()
      };
    case DateRangeFilterTypes.custom:
    default:
      return {
        [SERVER_DATE_RANGE_MIN_FILTER_NAME]: moment(
          value.dateStart
        ).toISOString(),
        [SERVER_DATE_RANGE_MAX_FILTER_NAME]: moment(value.dateEnd).toISOString()
      };
  }
};
