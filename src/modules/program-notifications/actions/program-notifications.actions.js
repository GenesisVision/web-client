import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

export const ADD_PROGRAM_NOTIFICATIONS = "ADD_PROGRAM_NOTIFICATIONS";
export const FETCH_PROGRAM_NOTIFICATIONS = "FETCH_PROGRAM_NOTIFICATIONS";

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
