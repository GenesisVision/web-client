import { diffDateRaw, formatDate, humanizeDate } from "utils/dates";

export const getConversationDate = (date: string | Date) => {
  const days = diffDateRaw(date, new Date(), "day");
  const seconds = diffDateRaw(date, new Date(), "second");
  if (days < 1) {
    if (seconds < 60) return `Just now`;
    return `${humanizeDate(date, new Date(), { unitsCount: 1 })} ago`;
  }
  return formatDate(date);
};
