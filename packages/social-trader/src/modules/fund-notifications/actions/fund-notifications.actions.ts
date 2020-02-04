import { FundNotificationSettingList } from "gv-api-web";
import notificationsApi from "services/api-client/notifications-api";
import { ApiAction, NotificationsActionType } from "utils/types";

export const ADD_FUND_NOTIFICATIONS = "ADD_FUND_NOTIFICATIONS";
export const FETCH_FUND_NOTIFICATIONS = "FETCH_FUND_NOTIFICATIONS";
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
  id: string,
  auth: string
): ApiAction<FundNotificationSettingList> => ({
  type: FETCH_FUND_NOTIFICATIONS,
  payload: notificationsApi.getNotificationsFundSettings(id, auth)
});

export const addErrorMessageAction = (
  payload: string
): NotificationsActionType<FundNotificationSettingList> => ({
  type: ADD_ERROR_MESSAGE,
  payload
});
