import {
  ADD_NOTIFICATIONS,
  ADD_TOTAL_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATIONS_OPTIONS
} from "../actions/notifications.actions";
import isOpenReducer from "../reducers/is-open.reducer";
import { TAKE_COUNT } from "../services/notifications.services";
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
    case CLEAR_NOTIFICATIONS:
      return [];
    default:
      return notifications;
  }
};

const addTotalCount = (total = 0, action) => {
  if (action.type === ADD_TOTAL_NOTIFICATIONS) {
    return action.total;
  }
  return total;
};

const notificationsReducer = combineReducers({
  notifications: addNotificationsReducer,
  isOpen: isOpenReducer,
  options: optionsReducer,
  total: addTotalCount
});

export default notificationsReducer;
