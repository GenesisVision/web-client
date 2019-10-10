import { subtractDate } from "shared/utils/dates";

export type ChartPeriodType =
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "all";

export const ChartPeriodType = {
  day: "day" as ChartPeriodType,
  week: "week" as ChartPeriodType,
  month: "month" as ChartPeriodType,
  quarter: "quarter" as ChartPeriodType,
  year: "year" as ChartPeriodType,
  all: "all" as ChartPeriodType
};

export const getPeriodStartDate = (periodType: ChartPeriodType) => {
  if (periodType === ChartPeriodType.all) {
    return undefined;
  }
  return subtractDate(new Date(), 1, periodType);
};

export const getDefaultPeriod = (): ChartDefaultPeriod => {
  return {
    type: ChartPeriodType.month,
    start: getPeriodStartDate(ChartPeriodType.month),
    end: new Date()
  };
};

export const DEFAULT_PERIOD = getDefaultPeriod();

export type ChartDefaultPeriod = {
  type: ChartPeriodType;
  start?: Date;
  end?: Date;
};
