import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import {
  TAddNotification,
  TRemoveNotification
} from "modules/asset-notifications/asset-notifications.types";
import {
  addNotificationSettingAction,
  fetchNotificationSettingsAction,
  removeNotificationSettingAction
} from "modules/notification-settings/actions/notification-settings.actions";
import { NextPageContext } from "next";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

export const fetchNotificationSettings = (ctx?: NextPageContext) => async (
  dispatch: MiddlewareDispatch
) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(fetchNotificationSettingsAction(authorization));
};

export const removeNotification: TRemoveNotification = (
  { id },
  message
) => dispatch =>
  ((dispatch(removeNotificationSettingAction(id)) as unknown) as Promise<
    void
  >).then(() => {
    dispatch(fetchNotificationSettings());
    dispatch(alertMessageActions.success(message));
  });

export const addNotification: TAddNotification = (opts, message) => dispatch =>
  ((dispatch(addNotificationSettingAction(opts)) as unknown) as Promise<
    void
  >).then(() => {
    dispatch(fetchNotificationSettings());
    dispatch(alertMessageActions.success(message));
  });
