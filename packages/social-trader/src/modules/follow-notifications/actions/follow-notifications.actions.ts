import { ProgramNotificationSettingList } from "gv-api-web";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";
import { ApiAction, NotificationsActionType } from "utils/types";

export const ADD_FOLLOW_NOTIFICATIONS = "ADD_FOLLOW_NOTIFICATIONS";
export const FETCH_FOLLOW_NOTIFICATIONS = "FETCH_FOLLOW_NOTIFICATIONS";
export const TOGGLE_FOLLOW_NOTIFICATION = "TOGGLE_FOLLOW_NOTIFICATION";
export const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";

export type TAddFollowNotificationsAction = NotificationsActionType<{
  [key: string]: ProgramNotificationSettingList;
}>;
export const addFollowNotificationsAction = (
  payload: ProgramNotificationSettingList
): TAddFollowNotificationsAction => ({
  type: ADD_FOLLOW_NOTIFICATIONS,
  payload: { [payload.url]: payload }
});

export const fetchFollowNotificationsAction = (
  id: string,
  auth: string
): ApiAction<ProgramNotificationSettingList> => ({
  type: FETCH_FOLLOW_NOTIFICATIONS,
  payload: notificationsApi.getNotificationsProgramSettings(id, auth)
});

export const addErrorMessageAction = (
  payload: string
): NotificationsActionType => ({
  type: ADD_ERROR_MESSAGE,
  payload
});

export const toggleFollowNotificationsAction = (
  id: string,
  enabled: boolean
): ApiAction<string> => ({
  type: TOGGLE_FOLLOW_NOTIFICATION,
  payload: notificationsApi.toggleNotificationSettings(
    id,
    enabled,
    authService.getAuthArg()
  )
});
