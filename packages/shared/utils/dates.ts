import {
  format,
  formatDistanceStrict,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears
} from "date-fns";

export const localizedDate = (date: Date | number | string): string => {
  return format(new Date(date), "PP");
};

export const formatDate = (date: Date | number | string): string => {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
};

export const durationDate = (
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
