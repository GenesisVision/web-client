import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps,
  addNotificationSetting,
  removeNotificationSetting
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  addErrorMessageAction,
  addProgramNotificationsAction,
  fetchProgramNotificationsAction,
  toggleProgramNotificationsAction
} from "../actions/program-notifications.actions";

export const fetchProgramNotifications = (id: string) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(fetchProgramNotificationsAction(id)).then(data =>
    dispatch(addProgramNotificationsAction(data.value))
  );

export const addProgramNotification = (
  opts: IAddNotificationSettingProps
) => (dispatch: MiddlewareDispatch) =>
  dispatch(addNotificationSetting(opts))
    .then(() => dispatch(fetchProgramNotifications(opts.assetId!)))
    .catch(data => dispatch(addErrorMessageAction(data.errorMessage)));

export const removeProgramNotification = ({
  id,
  assetId
}: IRemoveNotificationSettingProps) => (dispatch: MiddlewareDispatch) =>
  dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchProgramNotifications(assetId))
  );

export const toggleProgramNotifications = ({
  id,
  enabled,
  assetId
}: {
  id: string;
  enabled: boolean;
  assetId: string;
}) => (dispatch: MiddlewareDispatch) =>
  dispatch(toggleProgramNotificationsAction(id, enabled)).then(() =>
    dispatch(fetchProgramNotifications(assetId))
  );
