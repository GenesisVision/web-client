import { NotificationViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import {
  ADD_NOTIFICATIONS,
  ADD_TOTAL_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATIONS_OPTIONS,
  TAKE_COUNT
} from "shared/components/notifications/actions/notifications.actions";

import isOpenReducer from "./is-open.reducer";

type SkipTake = {
  skip: number;
  take: number;
};

const optionsReducer = (
  options: SkipTake = { take: TAKE_COUNT, skip: 0 } as SkipTake,
  action: any
) => {
  if (action.type === SET_NOTIFICATIONS_OPTIONS) {
    return action.options;
  }
  return options;
};

// TODO: добавить нормализацию, когда буду уникальные ID
const addNotificationsReducer = (
  notifications: NotificationViewModel[] = [] as NotificationViewModel[],
  action: any
): NotificationViewModel[] => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return [...notifications, ...action.notifications];
    case CLEAR_NOTIFICATIONS:
      return [];
    default:
      return notifications;
  }
};

const addTotalCount = (total: number = 0, action: any): number => {
  if (action.type === ADD_TOTAL_NOTIFICATIONS) {
    return action.total;
  }
  return total;
};

export type NotificationsState = Readonly<{
  notifications: NotificationViewModel[];
  isOpen: boolean;
  total: number;
  options: SkipTake;
}>;

const notificationsReducer = combineReducers<NotificationsState>({
  notifications: addNotificationsReducer,
  isOpen: isOpenReducer,
  options: optionsReducer,
  total: addTotalCount
});

export default notificationsReducer;
