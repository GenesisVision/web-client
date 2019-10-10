import { FundNotificationSettingList } from "gv-api-web";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { ApiAction, NotificationsActionType } from "shared/utils/types";

export const ADD_FUND_NOTIFICATIONS = "ADD_FUND_NOTIFICATIONS";
export const FETCH_FUND_NOTIFICATIONS = "FETCH_FUND_NOTIFICATIONS";
export const TOGGLE_FUND_NOTIFICATION = "TOGGLE_FUND_NOTIFICATION";
export const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";

export type TAddFundNotificationsAction = NotificationsActionType<{
  [key: string]: FundNotificationSettingList;
}>;
export const addFundNotificationsAction = (
  payload: FundNotificationSettingList
): TAddFundNotificationsAction => ({
  type: ADD_FUND_NOTIFICATIONS,
  payload: { [payload.url]: payload }
});

export const fetchFundNotificationsAction = (
  id: string
): ApiAction<FundNotificationSettingList> => ({
  type: FETCH_FUND_NOTIFICATIONS,
  payload: notificationsApi.getNotificationsFundSettings(
    id,
    authService.getAuthArg()
  )
});

export const addErrorMessageAction = (
  payload: string
): NotificationsActionType<FundNotificationSettingList> => ({
  type: ADD_ERROR_MESSAGE,
  payload
});

export const toggleFundNotificationsAction = (
  id: string,
  enabled: boolean
): ApiAction<string> => ({
  type: TOGGLE_FUND_NOTIFICATION,
  payload: notificationsApi.toggleNotificationSettings(
    id,
    enabled,
    authService.getAuthArg()
  )
});
