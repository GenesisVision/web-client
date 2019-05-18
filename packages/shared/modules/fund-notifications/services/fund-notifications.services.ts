import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps,
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

export const addFundNotification = (
  opts: IAddNotificationSettingProps
) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(addNotificationSetting(opts))
    .then(() => dispatch(fetchFundNotifications(opts.assetId!)))
    .catch(data => dispatch(addErrorMessageAction(data.errorMessage)));

export const removeFundNotification = ({
  id,
  assetId
}: IRemoveNotificationSettingProps) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchFundNotifications(assetId))
  );

export const toggleFundNotificationsService = ({
  id,
  enabled,
  assetId
}: {
  id: string;
  enabled: boolean;
  assetId: string;
}) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(toggleFundNotificationsAction(id, enabled)).then(() =>
    dispatch(fetchFundNotifications(assetId))
  );
