import { NextPageContext } from "next";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import {
  TAddNotification,
  TRemoveNotification,
  TToggleNotification
} from "shared/modules/asset-notifications/asset-notifications.types";
import {
  addNotificationSettingAction,
  removeNotificationSettingAction
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

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
    .catch(data => {
      dispatch(addErrorMessageAction(data.errorMessage));
    });

export const removeFollowNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  dispatch(removeNotificationSettingAction(id)).then(() => {
    dispatch(fetchFollowNotifications(assetId!));
    dispatch(alertMessageActions.success(message));
  });

export const toggleFollowNotification: TToggleNotification = ({
  id,
  enabled,
  assetId
}) => dispatch =>
  dispatch(toggleFollowNotificationsAction(id, enabled)).then(() => {
    dispatch(fetchFollowNotifications(assetId));
  });
