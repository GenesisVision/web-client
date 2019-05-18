import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { TAddNotification, TRemoveNotification } from "shared/modules/asset-notifications/asset-notifications.types";
import {
  addNotificationSetting,
  removeNotificationSetting
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  addErrorMessageAction,
  addFundNotificationsAction,
  fetchFundNotificationsAction,
  toggleFundNotificationsAction
} from "../actions/fund-notifications.actions";

export const fetchFundNotifications = (id: string) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(fetchFundNotificationsAction(id)).then(data =>
    dispatch(addFundNotificationsAction(data.value))
  );

export const addFundNotification: TAddNotification = (
  opts,
  message
) => dispatch =>
  dispatch(addNotificationSetting(opts))
    .then(() => {
      dispatch(fetchFundNotifications(opts.assetId!));
      dispatch(alertMessageActions.success(message));
    })
    .catch(data => dispatch(addErrorMessageAction(data.errorMessage)));

export const removeFundNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  dispatch(removeNotificationSetting(id)).then(() => {
    dispatch(fetchFundNotifications(assetId));
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
  dispatch(toggleFundNotificationsAction(id, enabled)).then(() =>
    dispatch(fetchFundNotifications(assetId))
  );
