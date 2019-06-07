import { ProgramNotificationSettingList } from "gv-api-web";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { ApiAction, NotificationsActionType } from "shared/utils/types";

export const ADD_PROGRAM_NOTIFICATIONS = "ADD_PROGRAM_NOTIFICATIONS";
export const FETCH_PROGRAM_NOTIFICATIONS = "FETCH_PROGRAM_NOTIFICATIONS";
export const TOGGLE_PROGRAM_NOTIFICATION = "TOGGLE_PROGRAM_NOTIFICATION";
export const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";

export const addProgramNotificationsAction = (
  payload: ProgramNotificationSettingList
): NotificationsActionType<ProgramNotificationSettingList> => ({
  type: ADD_PROGRAM_NOTIFICATIONS,
  payload
});

export const fetchProgramNotificationsAction = (
  id: string
): ApiAction<ProgramNotificationSettingList> => ({
  type: FETCH_PROGRAM_NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsSettingsProgramsByIdGet(
    id,
    authService.getAuthArg()
  )
});

export const addErrorMessageAction = (
  payload: string
): NotificationsActionType<ProgramNotificationSettingList> => ({
  type: ADD_ERROR_MESSAGE,
  payload
});

export const toggleProgramNotificationsAction = (
  id: string,
  enabled: boolean
): ApiAction<string> => ({
  type: TOGGLE_PROGRAM_NOTIFICATION,
  payload: notificationsApi.v10NotificationsSettingsByIdByEnablePost(
    id,
    enabled,
    authService.getAuthArg()
  )
});
