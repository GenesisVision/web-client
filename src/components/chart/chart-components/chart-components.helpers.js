import moment from "moment";

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

const getTicksCountByPeriod = (start, end) => {
  const duration = end.getTime() - start.getTime();
  const msInDay = 1000 * 60 * 60 * 24;
  if (duration <= msInDay) return 6;
  if (duration <= msInDay * 7) return 7;
  if (duration <= msInDay * 30) return 10;
  if (duration <= msInDay * 90) return 4;
  return 12;
};

export const composeTicks = (start, end) => {
  const periodStart = start.getTime();
  const periodEnd = end.getTime();
  const ticks = getTicksCountByPeriod(start, end);
  const diff = (periodEnd - periodStart) / (ticks - 1);
  return [...Array(ticks).keys()].map(x => periodStart + diff * x);
};
