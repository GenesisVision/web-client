import { NextPageContext } from "next";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import {
  TAddNotification,
  TRemoveNotification
} from "shared/modules/asset-notifications/asset-notifications.types";
import {
  addNotificationSettingAction,
  removeNotificationSettingAction
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  addErrorMessageAction,
  addFundNotificationsAction,
  fetchFundNotificationsAction,
  toggleFundNotificationsAction
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
    .catch(data => {
      dispatch(addErrorMessageAction(data.errorMessage));
    });

export const removeFundNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  dispatch(removeNotificationSettingAction(id)).then(() => {
    dispatch(fetchFundNotifications(assetId!));
    dispatch(alertMessageActions.success(message));
  });

export const toggleFundNotificationsService = ({
  id,
  enabled,
  assetId
}: {
  id: string;
  enabled: boolean;
  assetId: string;
}) => (dispatch: MiddlewareDispatch) =>
  dispatch(toggleFundNotificationsAction(id, enabled)).then(() => {
    dispatch(fetchFundNotifications(assetId));
  });
