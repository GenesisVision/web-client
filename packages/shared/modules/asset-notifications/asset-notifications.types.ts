import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import { MiddlewareDispatch } from "shared/utils/types";

import { INotification } from "./asset-notifications-general";

export type TAddNotification = (
  opts: IAddNotificationSettingProps,
  message: string
) => (dispatch: MiddlewareDispatch) => any;

export type TRemoveNotification = (
  opts: IRemoveNotificationSettingProps,
  message: string
) => (dispatch: MiddlewareDispatch) => any;

export type TToggleNotification = (
  opts: {
    id: string;
    enabled: boolean;
    assetId: string;
  }
) => (dispatch: MiddlewareDispatch) => any;

export type NotificationsList = {
  general: INotification[];
  custom: boolean;
};
