import { CancelablePromise } from "gv-api-web";
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
import { MiddlewareDispatch } from "utils/types";

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
    .payload!.then(() => {
      dispatch(fetchFundNotifications(opts.assetId!));
      dispatch(alertMessageActions.success(message));
    })
    .catch(data => {
      dispatch(addErrorMessageAction(data.errorMessage));
    }) as CancelablePromise<void>;

export const removeFundNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  ((dispatch(
    removeNotificationSettingAction(id)
  ) as unknown) as CancelablePromise<void>).then(() => {
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
