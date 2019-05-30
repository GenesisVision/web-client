import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import {
  TAddNotification,
  TRemoveNotification
} from "shared/modules/asset-notifications/asset-notifications.types";
import {
  addNotificationSettingAction,
  fetchNotificationSettingsAction,
  removeNotificationSettingAction
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import { MiddlewareDispatch } from "shared/utils/types";

export const fetchNotificationSettings = () => (dispatch: MiddlewareDispatch) =>
  dispatch(fetchNotificationSettingsAction());

export const removeNotification: TRemoveNotification = (
  { id },
  message
) => dispatch =>
  dispatch(removeNotificationSettingAction(id)).then(() => {
    dispatch(fetchNotificationSettings());
    dispatch(alertMessageActions.success(message));
  });

export const addNotification: TAddNotification = (opts, message) => dispatch =>
  dispatch(addNotificationSettingAction(opts)).then(() => {
    dispatch(fetchNotificationSettings());
    dispatch(alertMessageActions.success(message));
  });
