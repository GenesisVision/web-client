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
  addFollowNotificationsAction,
  fetchFollowNotificationsAction,
  toggleFollowNotificationsAction
} from "../actions/follow-notifications.actions";

export const fetchFollowNotifications = (
  id: string,
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(fetchFollowNotificationsAction(id, authorization)).then(data =>
    dispatch(addFollowNotificationsAction(data.value))
  );
};

export const addFollowNotification: TAddNotification = (
  opts,
  message
) => dispatch =>
  dispatch(addNotificationSettingAction(opts))
    .then(() => {
      dispatch(fetchFollowNotifications(opts.assetId!));
      dispatch(alertMessageActions.success(message));
    })
    .catch((data: ResponseError) => {
      dispatch(addErrorMessageAction(data.errorMessage));
    }) as Promise<void>;

export const removeFollowNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  ((dispatch(removeNotificationSettingAction(id)) as unknown) as Promise<
    void
  >).then(() => {
    dispatch(fetchFollowNotifications(assetId!));
    dispatch(alertMessageActions.success(message));
  });

export const toggleFollowNotification: TToggleNotification = ({
  id,
  enabled,
  assetId
}) => dispatch =>
  ((dispatch(
    toggleFollowNotificationsAction(id, enabled)
  ) as unknown) as Promise<void>).then(() => {
    dispatch(fetchFollowNotifications(assetId));
  });
