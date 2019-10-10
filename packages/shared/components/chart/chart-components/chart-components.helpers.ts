import { addDays, format, startOfDay } from "date-fns";

export const dateTickFormatter = (start: Date, end: Date) => (
  date: Date
): string => {
  let dateFormat;
  const duration = new Date(end).getTime() - new Date(start).getTime();
  const msInDay = 1000 * 60 * 60 * 24;
  if (duration <= msInDay) dateFormat = "p";
  else if (duration <= msInDay * 90) dateFormat = "LLL do";
  else if (duration <= msInDay * 365) dateFormat = "LLL";
  else dateFormat = "PP";

  return format(date, dateFormat);
};

const getTicksCountByPeriod = (duration: number): number => {
  const msInDay = 1000 * 60 * 60 * 24;
  if (duration <= msInDay * 7) return 7;
  if (duration <= msInDay * 30) return 10;
  if (duration <= msInDay * 90) return 4;
  return 12;
};

export const composeTicks = (start: Date, end: Date): number[] => {
  const periodStart = startOfDay(addDays(start, 1)).getTime();
  const periodEnd = startOfDay(end).getTime();

  const isOneDay = !Boolean(periodEnd - periodStart);

  const duration = isOneDay
    ? new Date(end).getTime() - new Date(start).getTime()
    : periodEnd - periodStart;

  const ticks = getTicksCountByPeriod(duration);

  const diff = duration / (ticks - 1);
  return [...Array(ticks).keys()].map(
    x => (isOneDay ? start.getTime() : periodStart) + diff * x
  );
};

const MIN_CHART_VALUE = 1e-6;
export const formartChartMinValue = (value: number): number => {
  return Math.abs(value) < MIN_CHART_VALUE ? 0 : value;
};
