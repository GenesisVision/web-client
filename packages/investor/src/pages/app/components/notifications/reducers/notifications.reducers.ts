import { NotificationViewModel } from "gv-api-web";
import {
  ADD_NOTIFICATIONS,
  ADD_TOTAL_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATIONS_OPTIONS
} from "pages/app/components/notifications/actions/notifications.actions";
import isOpenReducer from "pages/app/components/notifications/reducers/is-open.reducer";
import { TAKE_COUNT } from "pages/app/components/notifications/services/notifications.services";
import { combineReducers } from "redux";

const optionsReducer = (
  options = { take: TAKE_COUNT, skip: 0 },
  action: { type: string; options: { take: number; skip: number } }
) => {
  if (action.type === SET_NOTIFICATIONS_OPTIONS) {
    return action.options;
  }
  return options;
};

// TODO: добавить нормализацию, когда буду уникальные ID
const addNotificationsReducer = (
  notifications: NotificationViewModel[] = [],
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

export interface INotificationsStore {
  notifications: NotificationViewModel[];
  isOpen: boolean;
  total: number;
  options: { take: number; skip: number };
}

const notificationsReducer = combineReducers<INotificationsStore>({
  notifications: addNotificationsReducer,
  isOpen: isOpenReducer,
  options: optionsReducer,
  total: addTotalCount
});

export default notificationsReducer;
