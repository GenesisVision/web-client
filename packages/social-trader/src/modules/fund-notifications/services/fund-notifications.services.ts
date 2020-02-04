import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import {
  TAddNotification,
  TRemoveNotification
} from "modules/asset-notifications/asset-notifications.types";
import {
  addNotificationSettingAction,
  removeNotificationSettingAction
} from "modules/notification-settings/actions/notification-settings.actions";
import { NextPageContext } from "next";
import authService from "services/auth-service";
import { MiddlewareDispatch, ResponseError } from "utils/types";

import {
  addErrorMessageAction,
  addFundNotificationsAction,
  fetchFundNotificationsAction
} from "../actions/fund-notifications.actions";

export const fetchFundNotifications = (
  id: string,
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(fetchFundNotificationsAction(id, authorization)).then(data =>
    dispatch(addFundNotificationsAction(data.value))
  );
};

export const addFundNotification: TAddNotification = (
  opts,
  message
) => dispatch =>
  dispatch(addNotificationSettingAction(opts))
    .then(() => {
      dispatch(fetchFundNotifications(opts.assetId!));
      dispatch(alertMessageActions.success(message));
    })
    .catch((data: ResponseError) => {
      dispatch(addErrorMessageAction(data.errorMessage));
    }) as Promise<void>;

export const removeFundNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  ((dispatch(removeNotificationSettingAction(id)) as unknown) as Promise<
    void
  >).then(() => {
    dispatch(fetchFundNotifications(assetId!));
    dispatch(alertMessageActions.success(message));
  });
