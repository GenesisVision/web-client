import {
  NOTIFICATIONS_TOGGLE,
  NotificationToggleAction
} from "../actions/notifications.actions";

const isOpenReducer = (
  isOpen: boolean = false,
  action: NotificationToggleAction
): boolean => {
  if (action.type === NOTIFICATIONS_TOGGLE) {
    if (action.payload !== null) return action.payload;
    return !isOpen;
  }
  return isOpen;
};

export default isOpenReducer;
