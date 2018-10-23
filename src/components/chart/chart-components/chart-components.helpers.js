import moment from "moment";

import { ChartPeriodType } from "../chart-period/chart-period.helpers";

export const dateTickFormatter = periodType => date => {
  let dateFormat;
  switch (periodType) {
    case ChartPeriodType.day:
      dateFormat = "LT";
      break;
    case ChartPeriodType.week:
    case ChartPeriodType.month:
    case ChartPeriodType.quarter:
      dateFormat = "MMM Do";
      break;
    case ChartPeriodType.year:
      dateFormat = "MMM";
      break;
    default:
      dateFormat = "ll";
  }
  return moment(date).format(dateFormat);
};

const getTicksCountByPeriod = periodType => {
  switch (periodType) {
    case ChartPeriodType.day:
      return 12;
    case ChartPeriodType.week:
      return 7;
    case ChartPeriodType.month:
      return 30;
    case ChartPeriodType.quarter:
      return 4;
    case ChartPeriodType.year:
      return 12;
    default:
      return 7;
  }
};

export const composeTicks = period => {
  const periodStart = period.start.getTime();
  const periodEnd = period.end.getTime();
  const ticks = getTicksCountByPeriod(period.type);
  const diff = (periodEnd - periodStart) / (ticks - 1);
  return [...Array(ticks).keys()].map(x => periodStart + diff * x);
};
