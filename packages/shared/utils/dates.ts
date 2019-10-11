import {
  addDays,
  addHours,
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  format,
  formatDistanceStrict,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subQuarters,
  subWeeks,
  subYears
} from "date-fns";

export const localizedDate = (date: Date | number | string): string => {
  return format(new Date(date), "PP"); //Sep 16, 2019
};

export const formatDate = (date: Date | number | string): string => {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
};

export const distanceDate = (
  dateStart: Date | number | string,
  dateEnd: Date | number | string = new Date(),
  addSuffix: boolean = false
): string => {
  return formatDistanceStrict(new Date(dateStart), new Date(dateEnd), {
    addSuffix
  });
};

export const subtractDate = (
  date: number | string | Date,
  amount: number,
  type: "day" | "week" | "month" | "quarter" | "year" | string
): Date | undefined => {
  try {
    if (type === "day") return subDays(new Date(date), amount);
    if (type === "week") return subWeeks(new Date(date), amount);
    if (type === "month") return subMonths(new Date(date), amount);
    if (type === "quarter") return subQuarters(new Date(date), amount);
    if (type === "year") return subYears(new Date(date), amount);
  } catch (e) {
    throw new Error(
      "wrong type, it should be day | week | month | quarter | year"
    );
  }
};

const getMonths = (to: Date, amount: number): string => {
  const from = subMonths(to, amount);
  if (amount > 0) {
    return formatDistanceStrict(to, from, {
      unit: "month",
      roundingMethod: "floor"
    });
  }
  return "";
};

const getDays = (to: Date, amount: number): string => {
  const from = subDays(to, amount);
  if (amount > 0) {
    return formatDistanceStrict(to, from, {
      unit: "day",
      roundingMethod: "floor"
    });
  }
  return "";
};

const getHours = (to: Date, amount: number): string => {
  const from = subHours(to, amount);
  if (amount > 0) {
    return formatDistanceStrict(to, from, {
      unit: "hour",
      roundingMethod: "floor"
    });
  }
  return "";
};

const getMinutes = (to: Date, amount: number): string => {
  const from = subMinutes(to, amount);
  if (amount > 0) {
    return formatDistanceStrict(to, from, {
      unit: "minute",
      roundingMethod: "floor"
    });
  }
  return "";
};

export const durationPeriod = (
  start: string | number | Date,
  end: string | number | Date
): string => {
  const from = new Date(start);
  const to = new Date(end);

  const months = differenceInMonths(to, from);

  const withoutMonths = addMonths(from, months);
  const days = differenceInDays(to, withoutMonths);

  const withoutDays = addDays(withoutMonths, days);
  const hours = differenceInHours(to, withoutDays);

  const withoutHours = addHours(withoutDays, hours);
  const minutes = differenceInMinutes(to, withoutHours);

  const m = getMonths(to, months);
  const d = getDays(to, days);
  const h = months > 0 ? "" : getHours(to, hours);
  const min = days > 0 || months > 0 ? "" : getMinutes(to, minutes);

  return `${m} ${d} ${h} ${min}`.trim();
};
