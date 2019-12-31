import { subtractDate } from "utils/dates";

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

export const ChartPeriodTypeValues = Object.values(ChartPeriodType);

export const getPeriodStartDate = (periodType: TChartPeriod) => {
  if (periodType === ChartPeriodType.all) {
    return undefined;
  }
  return subtractDate(new Date(), 1, periodType as any);
};

const DEFAULT_PERIOD_TYPE = ChartPeriodType.month;

export const getDefaultPeriod = (): ChartDefaultPeriod => {
  return {
    type: ChartPeriodType.month,
    start: getPeriodStartDate(DEFAULT_PERIOD_TYPE)
  };
};

export const DEFAULT_PERIOD = getDefaultPeriod();

export type ChartDefaultPeriod = {
  type: TChartPeriod;
  start?: Date;
  end?: Date;
};
