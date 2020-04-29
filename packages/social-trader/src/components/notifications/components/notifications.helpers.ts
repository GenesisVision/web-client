import dayjs from "dayjs";
import { NotificationViewModel } from "gv-api-web";

export type NotificationGroups = { [name: number]: NotificationViewModel[] };

export const TAKE_COUNT = 10;

export const initialOptions = { take: TAKE_COUNT, skip: 0 };

export type SkipTake = Readonly<{
  skip: number;
  take: number;
}>;

export const calculateOptions = (
  options?: SkipTake,
  total: number = 0
): SkipTake => {
  if (!options) return { take: TAKE_COUNT, skip: 0 };
  const { take = 0, skip = 0 } = options;
  const newSkip = skip + take;
  const newTake = Math.max(Math.min(TAKE_COUNT, total - newSkip), 0);
  return { take: newTake, skip: newSkip };
};

export const parseDate = (
  unix: number,
  sameDay: string,
  lastDay: string
): string =>
  dayjs(unix)
    .calendar(undefined, {
      sameDay: `[${sameDay}], DD MMMM`,
      lastDay: `[${lastDay}], DD MMMM`,
      lastWeek: "dddd, DD MMMM",
      sameElse: "dddd, DD MMMM"
    })
    .toUpperCase();

export const sortGroups = (a: string, b: string) => parseInt(b) - parseInt(a);

export const getGroups = (
  notifications: NotificationViewModel[]
): NotificationGroups =>
  notifications.reduce<NotificationGroups>((acc, notification) => {
    const key = dayjs(notification.date)
      .startOf("day")
      .toDate()
      .getTime();
    if (!Array.isArray(acc[key])) {
      acc[key] = [];
    }
    acc[key].push(notification);
    return acc;
  }, {});
