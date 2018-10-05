import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

export const NOTIFICATIONS = "NOTIFICATIONS";
export const NOTIFICATIONS_TOGGLE = "NOTIFICATIONS_TOGGLE";
export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const ADD_NOTIFICATIONS_COUNT = "ADD_NOTIFICATIONS_COUNT";
export const SET_NOTIFICATIONS_OPTIONS = "SET_NOTIFICATIONS_OPTIONS";

export const notificationsToggle = () => ({
  type: NOTIFICATIONS_TOGGLE
});

export const addNotifications = notifications => ({
  type: ADD_NOTIFICATIONS,
  notifications
});

export const addNotificationsCount = count => ({
  type: ADD_NOTIFICATIONS_COUNT,
  count
});

export const setNotificationsOptions = options => ({
  type: SET_NOTIFICATIONS_OPTIONS,
  options
});

export const notificationsFetch = opts => ({
  type: NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsGet(authService.getAuthArg(), opts)
});
