import moment, { unitOfTime } from "moment";

export enum ChartPeriodType {
  day = "day",
  week = "week",
  month = "month",
  quarter = "quarter",
  year = "year",
  all = "all"
}

export const getPeriodStartDate = (
  periodType: keyof typeof ChartPeriodType
) => {
  const type: unitOfTime.DurationConstructor = `${periodType}s` as unitOfTime.DurationConstructor;
  switch (periodType) {
    case ChartPeriodType.all:
      return undefined;
    default:
      return moment()
        .subtract(1, type)
        .toDate();
  }
};

export const DEFAULT_PERIOD = {
  type: ChartPeriodType.month,
  start: getPeriodStartDate(ChartPeriodType.month),
  end: moment().toDate()
};

export type ChartDefaultPeriod = {
  type: keyof typeof ChartPeriodType;
  start?: Date;
  end?: Date;
};

export const getDefaultPeriod = (): ChartDefaultPeriod => {
  return DEFAULT_PERIOD;
};
