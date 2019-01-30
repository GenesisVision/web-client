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
import { DeepReadonly } from "utility-types";

type SkipTake = {
  skip: number;
  take: number;
};

const optionsReducer = (
  options: SkipTake = { take: TAKE_COUNT, skip: 0 },
  action: any
) => {
  if (action.type === SET_NOTIFICATIONS_OPTIONS) {
    return action.options;
  }
  return options;
};

// TODO: добавить нормализацию, когда буду уникальные ID
const addNotificationsReducer = (
  notifications: DeepReadonly<Array<NotificationViewModel>> = [],
  action: any
): DeepReadonly<Array<NotificationViewModel>> => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return [...notifications, ...action.notifications];
    case CLEAR_NOTIFICATIONS:
      return [];
    default:
      return notifications;
  }
};

const addTotalCount = (total: number = 0, action: any) => {
  if (action.type === ADD_TOTAL_NOTIFICATIONS) {
    return action.total;
  }
  return total;
};

export type NotificationsState = DeepReadonly<{
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
