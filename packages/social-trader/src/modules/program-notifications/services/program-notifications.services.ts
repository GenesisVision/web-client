import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import {
  TAddNotification,
  TRemoveNotification,
  TToggleNotification
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
  addProgramNotificationsAction,
  fetchProgramNotificationsAction,
  toggleProgramNotificationsAction
} from "../actions/program-notifications.actions";

export const fetchProgramNotifications = (
  id: string,
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(
    fetchProgramNotificationsAction(id, authorization)
  ).then(data => dispatch(addProgramNotificationsAction(data.value)));
};

export const addProgramNotification: TAddNotification = opts => dispatch =>
  dispatch(addNotificationSettingAction(opts))
    .then(() => {
      dispatch(fetchProgramNotifications(opts.assetId!));
    })
    .catch((data: ResponseError) => {
      dispatch(addErrorMessageAction(data.errorMessage));
    }) as Promise<void>;

export const removeProgramNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  ((dispatch(removeNotificationSettingAction(id)) as unknown) as Promise<
    void
  >).then(() => {
    dispatch(fetchProgramNotifications(assetId!));
    dispatch(alertMessageActions.success(message));
  });

export const toggleProgramNotification: TToggleNotification = ({
  id,
  enabled,
  assetId
}) => dispatch =>
  ((dispatch(
    toggleProgramNotificationsAction(id, enabled)
  ) as unknown) as Promise<void>).then(() => {
    dispatch(fetchProgramNotifications(assetId));
  });
