import { format, formatDistance } from "date-fns";

export const localizedDate = (date: Date | number | string): string => {
  return format(new Date(date), "PP");
};

export const formatDate = (date: Date | number | string): string => {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
};

export const durationDate = (
  dateStart: Date | number | string,
  dateEnd: Date | number | string = new Date()
): string => {
  return formatDistance(new Date(dateStart), new Date(dateEnd));
};
