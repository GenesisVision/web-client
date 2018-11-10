import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";

export const ADD_PROGRAM_NOTIFICATIONS = "ADD_PROGRAM_NOTIFICATIONS";
export const FETCH_PROGRAM_NOTIFICATIONS = "FETCH_PROGRAM_NOTIFICATIONS";
export const TOGGLE_PROGRAM_NOTIFICATION = "TOGGLE_PROGRAM_NOTIFICATION";
export const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";

export const addProgramNotifications = settings => ({
  type: ADD_PROGRAM_NOTIFICATIONS,
  settings
});

export const fetchProgramNotifications = id => ({
  type: FETCH_PROGRAM_NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsSettingsProgramsByIdGet(
    id,
    authService.getAuthArg()
  )
});

export const addErrorMessage = errorMessage => ({
  type: ADD_ERROR_MESSAGE,
  errorMessage
});

export const toggleProgramNotifications = (id, enabled) => ({
  type: TOGGLE_PROGRAM_NOTIFICATION,
  payload: notificationsApi.v10NotificationsSettingsByIdByEnablePost(
    id,
    enabled,
    authService.getAuthArg()
  )
});
