import moment from "moment";
const MS_IN_DAY = 1000 * 60 * 60 * 24;

export const dateTickFormatter = (start, end) => date => {
  let dateFormat;
  const duration = end.getTime() - start.getTime();
  const msInDay = 1000 * 60 * 60 * 24;
  if (duration <= msInDay) dateFormat = "LT";
  else if (duration <= msInDay * 90) dateFormat = "MMM Do";
  else if (duration <= msInDay * 365) dateFormat = "MMM";
  else dateFormat = "ll";

  return moment(date).format(dateFormat);
};

const getTicksCountByPeriod = duration => {
  const msInDay = 1000 * 60 * 60 * 24;
  if (duration <= msInDay * 7) return 7;
  if (duration <= msInDay * 30) return 10;
  if (duration <= msInDay * 90) return 4;
  return 12;
};

const getDays = (start, end) => {
  const period = getPeriod(start, end);
  return 1 + period.duration / MS_IN_DAY;
};

const getTypeByDays = days => {
  if (days === 1) return "DAY";
  if (days <= 7) return "WEEK";
  if (days <= 31) return "MONTH";
};

const getDayTicks = (start, end) => {
  const ticks = 7;
  const duration = end.getTime() - start.getTime();
  const diff = duration / (ticks - 1);
  return [...Array(ticks).keys()].map(x => start.getTime() + diff * x);
};

const getWeekTicks = (start, end) => {
  const ticks = 6;
  const period = getPeriod(start, end);
  const diff = period.duration / (ticks - 1);
  return [...Array(ticks).keys()].map(x => period.start + diff * x);
};

const getMonthTicks = (start, end) => {
  const MONTH_PERIOD = 3;
  const firstDate = moment(end).startOf("month");

  const daysBefore =
    Math.floor((firstDate - start) / MONTH_PERIOD / MS_IN_DAY) * MONTH_PERIOD;
  const newStart = moment(firstDate).subtract(daysBefore, "days");

  const daysAfter =
    Math.floor((end - firstDate) / MONTH_PERIOD / MS_IN_DAY) * MONTH_PERIOD;
  const newEnd = moment(firstDate).add(daysAfter, "days");

  const diff = MONTH_PERIOD * MS_IN_DAY;

  const ticks = 1 + (newEnd - newStart) / MS_IN_DAY / MONTH_PERIOD;

  return [...[...Array(ticks).keys()].map(x => newStart + diff * x)];
};

const getPeriod = (start, end) => {
  let periodStart = moment(start)
    .add(1, "days")
    .startOf("day");

  let periodEnd = moment(end).startOf("day");
  return {
    start: periodStart,
    end: periodEnd,
    duration: periodEnd - periodStart
  };
};

export const composeTicks = (start, end) => {
  const days = getDays(start, end);
  const typeByDays = getTypeByDays(days);

  if (typeByDays === "DAY") {
    return getDayTicks(start, end);
  }

  if (typeByDays === "WEEK") {
    return getWeekTicks(start, end);
  }

  if (typeByDays === "MONTH") {
    return getMonthTicks(start, end);
  }

  const period = getPeriod(start, end);
  const ticks = getTicksCountByPeriod(period.duration);
  const diff = period.duration / (ticks - 1);
  return [...Array(ticks).keys()].map(x => period.start + diff * x);
};

const MIN_CHART_VALUE = 1e-6;
export const formartChartMinValue = value => {
  return Math.abs(value) < MIN_CHART_VALUE ? 0 : value;
};
