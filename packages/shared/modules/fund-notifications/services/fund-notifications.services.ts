import { CancelablePromise } from "gv-api-web";
import {
  IAddNotificationSettingProps,
  addNotificationSetting,
  removeNotificationSetting
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  FundNotificationsActionType,
  addErrorMessage,
  addFundNotifications,
  fetchFundNotifications,
  toggleFundNotifications
} from "../actions/fund-notifications.actions";

export const fetchFundNotificationsService = (id: string) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(fetchFundNotifications(id)).then(data =>
    dispatch(addFundNotifications(data.value))
  );

export const addFundNotification = (
  opts: IAddNotificationSettingProps
) => (
  dispatch: MiddlewareDispatch
): CancelablePromise<FundNotificationsActionType<string>> =>
  dispatch(addNotificationSetting(opts))
    .then(() => dispatch(fetchFundNotificationsService(opts.assetId!)))
    .catch(data => dispatch(addErrorMessage(data.errorMessage)));

export const removeFundNotification = ({
  id,
  assetId
}: {
  id: string;
  assetId: string;
}) => (
  dispatch: MiddlewareDispatch
): CancelablePromise<FundNotificationsActionType<string>> =>
  dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchFundNotificationsService(assetId))
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
): CancelablePromise<FundNotificationsActionType<string>> =>
  dispatch(toggleFundNotifications(id, enabled)).then(() =>
    dispatch(fetchFundNotificationsService(assetId))
  );
