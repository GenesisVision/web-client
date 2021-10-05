import dayjs, { OpUnitType } from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";
import Utc from "dayjs/plugin/utc";
import { withPlural } from "utils/helpers";

const DEFAULT_DATE_RANGE = "month";

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);
dayjs.extend(Calendar);
dayjs.extend(Utc);

export const localizedDate = (date: Date | number | string): string => {
  return dayjs(date).format("ll");
};

export const formatTime = (date: Date | number | string): string => {
  return dayjs(date).format("HH:mm:ss");
};

export const formatDate = (date: Date | number | string): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export const diffDate = (
  dateStart: Date | number | string,
  dateEnd: Date | number | string = new Date(),
  unit?: OpUnitType
) => {
  return dayjs(diffDateRaw(dateStart, dateEnd, unit));
};

export const diffDateRaw = (
  dateStart: Date | number | string,
  dateEnd: Date | number | string = new Date(),
  unit?: OpUnitType
) => {
  return dayjs(dateEnd).diff(dayjs(dateStart), unit);
};

export const diffStringDate = (
  dateStart: Date | number | string,
  dateEnd: Date | number | string = new Date()
) => {
  const minutes = diffDateRaw(dateStart, dateEnd, "minute");
  const hours = diffDateRaw(dateStart, dateEnd, "hour");
  const days = diffDateRaw(dateStart, dateEnd, "day");
  const months = diffDateRaw(dateStart, dateEnd, "month");
  const years = diffDateRaw(dateStart, dateEnd, "year");
  switch (true) {
    case minutes < 60:
      return `${minutes} minutes`;
    case hours > 0 && days < 1:
      const restMinutes = minutes % 60;
      const restMinutesText = restMinutes
        ? `${restMinutes} ${withPlural("minute", restMinutes)}`
        : "";
      return `${hours} ${withPlural("hour", hours)} ${restMinutesText}`;
    case days > 0 && months < 1:
      const restHours = hours % 24;
      const restHoursText = restHours
        ? `${restHours} ${withPlural("hour", restHours)}`
        : "";
      return `${days} ${withPlural("day", days)} ${restHoursText}`;
    case months > 0 && years < 1:
      const restDays = days % 30;
      const restDaysText = restDays
        ? `${restDays} ${withPlural("day", restDays)}`
        : "";
      return `${months} ${withPlural("month", months)} ${restDaysText}`;
    default:
      const restMonths = months % 12;
      const restMonthsText = restMonths
        ? `${restMonths} ${withPlural("month", restMonths)}`
        : "";
      return `${years} ${withPlural("year", years)} ${restMonthsText}`;
  }
};

export const distanceDate = (
  dateStart: Date | number | string,
  dateEnd: Date | number | string = new Date(),
  addSuffix: boolean = false
): string => {
  return dayjs(dateStart).to(dayjs(dateEnd), !addSuffix);
};

export const subtractDate = (
  date: number | string | Date,
  amount: number,
  type: "day" | "week" | "month" | "quarter" | "year"
): Date => {
  if (type === "week") {
    return dayjs(date)
      .subtract(7 * amount, "day")
      .toDate();
  }
  if (type === "quarter") {
    return dayjs(date)
      .subtract(3 * amount, "month")
      .toDate();
  }
  return dayjs(date).subtract(amount, type).toDate();
};

export type TTimeUnitName =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "week";

export const TimeUnitName = {
  YEARS: "year" as TTimeUnitName,
  MONTHS: "month" as TTimeUnitName,
  DAYS: "day" as TTimeUnitName,
  HOURS: "hour" as TTimeUnitName,
  MINUTES: "minute" as TTimeUnitName
};

export const timeUnits = {
  [TimeUnitName.YEARS]: 0,
  [TimeUnitName.MONTHS]: 0,
  [TimeUnitName.DAYS]: 0,
  [TimeUnitName.HOURS]: 0,
  [TimeUnitName.MINUTES]: 0
};

const getString = (value: number, period: string) => {
  if (value === 0) return "";
  const str = `${value} ${period}`;
  return value === 1 ? str : str + "s";
};

export const humanizeDate = (
  start: string | number | Date,
  end: string | number | Date = new Date(),
  options?: { unitsCount?: number }
): string => {
  let from = dayjs(start);
  const to = dayjs(end);

  const thisTimeUnits = { ...timeUnits };

  for (const period in thisTimeUnits) {
    thisTimeUnits[period] = dayjs(to).diff(from, period as TTimeUnitName);
    from = dayjs(from).add(thisTimeUnits[period], period as TTimeUnitName);
  }

  return Object.entries(thisTimeUnits)
    .filter(period => period[1] > 0)
    .slice(0, options?.unitsCount || 2)
    .reduce((str, value) => {
      return `${str} ${getString(value[1], value[0])}`;
    }, "")
    .trim();
};

export const dateFrom = (
  subtract?: "month" | "week",
  date: Date | number = new Date()
): string =>
  dayjs(date)
    .subtract(1, subtract || "second")
    .startOf("minute")
    .toISOString();

export const dateTo = (): string =>
  dayjs().add(1, "minute").startOf("minute").toISOString();

export const getDefaultDateRange = () => ({
  dateFrom: subtractDate(new Date(), 1, DEFAULT_DATE_RANGE)
});

export const shortDateField = (dateField: string): string => {
  const letter = dateField[0];
  switch (dateField) {
    case "few":
      return "";
    case "hours":
    case "hour":
    case "seconds":
    case "second":
    case "minutes":
    case "minute":
      return letter;
    default:
      return letter.toLocaleUpperCase();
  }
};

export const convertDateToShortFormat = (date: string) =>
  date
    .split(" ")
    .map(word =>
      word.toLowerCase() === "a" || word.toLowerCase() === "an" ? "1" : word
    )
    .map(word => (isNaN(+word) ? shortDateField(word) : word))
    .join(" ");
