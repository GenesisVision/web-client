import { FundNotificationSettingList } from "gv-api-web";
import { Action } from "redux";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { ApiAction } from "shared/utils/types";

export const ADD_FUND_NOTIFICATIONS = "ADD_FUND_NOTIFICATIONS";
export const FETCH_FUND_NOTIFICATIONS = "FETCH_FUND_NOTIFICATIONS";
export const TOGGLE_FUND_NOTIFICATION = "TOGGLE_FUND_NOTIFICATION";
export const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";

export interface FundNotificationsActionType<T = any> extends Action {
  type: string;
  settings?: FundNotificationSettingList;
  payload?: T;
  errorMessage?: string;
}

export const addFundNotifications = (
  settings: any
): FundNotificationsActionType<string> => ({
  type: ADD_FUND_NOTIFICATIONS,
  settings
});

export const fetchFundNotifications = (
  id: string
): ApiAction<FundNotificationSettingList> => ({
  type: FETCH_FUND_NOTIFICATIONS,
  payload: notificationsApi.v10NotificationsSettingsFundsByIdGet(
    id,
    authService.getAuthArg()
  )
});

export const addErrorMessage = (
  errorMessage: string
): FundNotificationsActionType<string> => ({
  type: ADD_ERROR_MESSAGE,
  errorMessage
});

export const toggleFundNotifications = (
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
