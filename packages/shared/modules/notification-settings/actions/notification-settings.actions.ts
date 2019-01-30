import { NotificationSettingList } from "gv-api-web";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";

import { ActionType } from "../../../utils/types";

export const NOTIFICATION_SETTINGS = "NOTIFICATION_SETTINGS";
export const ADD_NOTIFICATION_SETTINGS = "ADD_NOTIFICATION_SETTINGS";
export const REMOVE_NOTIFICATION_SETTING = "REMOVE_NOTIFICATION_SETTING";
export const ADD_NOTIFICATION_SETTING = "ADD_NOTIFICATION_SETTING";

export interface IAddNotificationSettings {
  type: string;
  settings: NotificationSettingList;
}

export const addNotificationSettings = (
  settings: NotificationSettingList
): IAddNotificationSettings => {
  return { type: ADD_NOTIFICATION_SETTINGS, settings };
};

export const fetchNotificationSettings = () => ({
  type: NOTIFICATION_SETTINGS,
  payload: notificationsApi.v10NotificationsSettingsGet(
    authService.getAuthArg()
  )
});

export const addNotificationSetting = (opts: object): ActionType => ({
  type: ADD_NOTIFICATION_SETTING,
  payload: notificationsApi.v10NotificationsSettingsAddPost(
    authService.getAuthArg(),
    opts
  )
});

export const removeNotificationSetting = (id: string): ActionType => ({
  type: REMOVE_NOTIFICATION_SETTING,
  payload: notificationsApi.v10NotificationsSettingsRemoveByIdPost(
    id,
    authService.getAuthArg()
  )
});
