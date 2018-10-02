import {
  ADD_NOTIFICATIONS,
  SET_NOTIFICATIONS_OPTIONS
} from "pages/app/components/notifications/actions/notifications.actions";
import isOpenReducer from "pages/app/components/notifications/reducers/is-open.reducer";
import { TAKE_COUNT } from "pages/app/components/notifications/services/notifications.services";
import { combineReducers } from "redux";

const optionsReducer = (options = { take: TAKE_COUNT, skip: 0 }, action) => {
  if (action.type === SET_NOTIFICATIONS_OPTIONS) {
    return action.options;
  }
  return options;
};

// TODO: добавить нормализацию, когда буду уникальные ID
const addNotificationsReducer = (notifications = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return [...notifications, ...action.notifications];
    default:
      return notifications;
  }
};

const notificationsReducer = combineReducers({
  notifications: addNotificationsReducer,
  isOpen: isOpenReducer,
  options: optionsReducer
});

export default notificationsReducer;
