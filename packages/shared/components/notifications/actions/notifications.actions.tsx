import { NotificationList, NotificationViewModel } from "gv-api-web";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";

import { ApiAction } from "../../../utils/types";

export const NOTIFICATIONS = "NOTIFICATIONS";
export const NOTIFICATIONS_TOGGLE = "NOTIFICATIONS_TOGGLE";
export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const SET_NOTIFICATIONS_OPTIONS = "SET_NOTIFICATIONS_OPTIONS";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const ADD_TOTAL_NOTIFICATIONS = "ADD_TOTAL_NOTIFICATIONS";
export const TAKE_COUNT = 10;

export type NotificationToggleAction = Readonly<{
  type: typeof NOTIFICATIONS_TOGGLE;
}>;

export type AddNotificationsAction = Readonly<{
  type: typeof ADD_NOTIFICATIONS;
  notifications: Array<NotificationViewModel>;
}>;

export type AddTotalNotificationsAction = Readonly<{
  type: typeof ADD_TOTAL_NOTIFICATIONS;
  total: number;
}>;

export type ClearNotificationsAction = Readonly<{
  type: typeof CLEAR_NOTIFICATIONS;
}>;

export type SetNotificationsOptionsAction = Readonly<{
  type: typeof SET_NOTIFICATIONS_OPTIONS;
  options: SkipTake;
}>;

export type SkipTake = Readonly<{
  skip: number;
  take: number;
}>;

export const notificationsToggle = (): NotificationToggleAction => ({
  type: NOTIFICATIONS_TOGGLE
});

export const addNotifications = (
  notifications: Array<NotificationViewModel>
): AddNotificationsAction => ({
  type: ADD_NOTIFICATIONS,
  notifications
});

export const addTotalNotifications = (
  total: number
): AddTotalNotificationsAction => ({
  type: ADD_TOTAL_NOTIFICATIONS,
  total
});

export const clearNotifications = (): ClearNotificationsAction => ({
  type: CLEAR_NOTIFICATIONS
});

export const setNotificationsOptions = (
  options: SkipTake
): SetNotificationsOptionsAction => ({
  type: SET_NOTIFICATIONS_OPTIONS,
  options
});

export const notificationsFetch = (
  options: SkipTake
): ApiAction<NotificationList> => ({
  type: NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsGet(
    authService.getAuthArg(),
    options
  )
});

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
