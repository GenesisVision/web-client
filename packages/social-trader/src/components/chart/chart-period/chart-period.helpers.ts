import { subtractDate } from "shared/utils/dates";

export type TChartPeriod =
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "all";

export const ChartPeriodType = {
  day: "day" as TChartPeriod,
  week: "week" as TChartPeriod,
  month: "month" as TChartPeriod,
  quarter: "quarter" as TChartPeriod,
  year: "year" as TChartPeriod,
  all: "all" as TChartPeriod
};

export const getPeriodStartDate = (periodType: TChartPeriod) => {
  if (periodType === ChartPeriodType.all) {
    return undefined;
  }
  return subtractDate(new Date(), 1, periodType as any);
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
  type: TChartPeriod;
  start?: Date; // TODO set start/end as required
  end?: Date;
};
