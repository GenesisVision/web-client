import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

export const NOTIFICATIONS = "NOTIFICATIONS";
export const NOTIFICATIONS_TOGGLE = "NOTIFICATIONS_TOGGLE";
export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const SET_NOTIFICATIONS_OPTIONS = "SET_NOTIFICATIONS_OPTIONS";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const ADD_TOTAL_NOTIFICATIONS = "ADD_TOTAL_NOTIFICATIONS";

export const notificationsToggle = () => ({
  type: NOTIFICATIONS_TOGGLE
});

export const addNotifications = notifications => ({
  type: ADD_NOTIFICATIONS,
  notifications
});

export const addTotalNotifications = total => ({
  type: ADD_TOTAL_NOTIFICATIONS,
  total
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
});

export const setNotificationsOptions = options => ({
  type: SET_NOTIFICATIONS_OPTIONS,
  options
});

export const notificationsFetch = opts => ({
  type: NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsGet(authService.getAuthArg(), opts)
});
