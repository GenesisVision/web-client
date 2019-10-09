import { format } from "date-fns";

export const localizedDate = (date: Date | number | string): string => {
  return format(new Date(date), "PP");
};

export const formatDate = (date: Date | number | string): string => {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
};
