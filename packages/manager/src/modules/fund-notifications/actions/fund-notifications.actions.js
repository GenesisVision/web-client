import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";

export const ADD_FUND_NOTIFICATIONS = "ADD_FUND_NOTIFICATIONS";
export const FETCH_FUND_NOTIFICATIONS = "FETCH_FUND_NOTIFICATIONS";
export const TOGGLE_FUND_NOTIFICATION = "TOGGLE_FUND_NOTIFICATION";
export const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";

export const addFundNotifications = settings => ({
  type: ADD_FUND_NOTIFICATIONS,
  settings
});

export const fetchFundNotifications = id => ({
  type: FETCH_FUND_NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsSettingsFundsByIdGet(
    id,
    authService.getAuthArg()
  )
});

export const addErrorMessage = errorMessage => ({
  type: ADD_ERROR_MESSAGE,
  errorMessage
});

export const toggleFundNotifications = (id, enabled) => ({
  type: TOGGLE_FUND_NOTIFICATION,
  payload: notificationsApi.v10NotificationsSettingsByIdByEnablePost(
    id,
    enabled,
    authService.getAuthArg()
  )
});
