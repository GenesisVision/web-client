import { FundNotificationSettingList } from "gv-api-web";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { ApiAction, NotificationsActionType } from "shared/utils/types";

export const ADD_FUND_NOTIFICATIONS = "ADD_FUND_NOTIFICATIONS";
export const FETCH_FUND_NOTIFICATIONS = "FETCH_FUND_NOTIFICATIONS";
export const TOGGLE_FUND_NOTIFICATION = "TOGGLE_FUND_NOTIFICATION";
export const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";

export const addFundNotificationsAction = (
  settings: FundNotificationSettingList
): NotificationsActionType<FundNotificationSettingList> => ({
  type: ADD_FUND_NOTIFICATIONS,
  settings
});

export const fetchFundNotificationsAction = (
  id: string
): ApiAction<FundNotificationSettingList> => ({
  type: FETCH_FUND_NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsSettingsFundsByIdGet(
    id,
    authService.getAuthArg()
  )
});

export const addErrorMessageAction = (
  errorMessage: string
): NotificationsActionType<FundNotificationSettingList> => ({
  type: ADD_ERROR_MESSAGE,
  errorMessage
});

export const toggleFundNotificationsAction = (
  id: string,
  enabled: boolean
): ApiAction<string> => ({
  type: TOGGLE_FUND_NOTIFICATION,
  payload: notificationsApi.v10NotificationsSettingsByIdByEnablePost(
    id,
    enabled,
    authService.getAuthArg()
  )
});
