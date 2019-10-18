import { CancelablePromise } from "gv-api-web";
import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import { MiddlewareDispatch } from "shared/utils/types";

import { INotification } from "./asset-notifications-general";

export type TAddNotification = (
  opts: IAddNotificationSettingProps,
  message: string
) => (dispatch: MiddlewareDispatch) => CancelablePromise<void>;

export type TRemoveNotification = (
  opts: IRemoveNotificationSettingProps,
  message: string
) => (dispatch: MiddlewareDispatch) => CancelablePromise<void>;

export type TToggleNotification = (opts: {
  id: string;
  enabled: boolean;
  assetId: string;
}) => (dispatch: MiddlewareDispatch) => CancelablePromise<void>;

export type NotificationsList = {
  general: INotification[];
  custom: boolean;
};

export enum NOTIFICATIONS {
  PlatformNewsAndUpdates = "PlatformNewsAndUpdates",
  PlatformEmergency = "PlatformEmergency",
  FundNewsAndUpdates = "FundNewsAndUpdates",
  FundRebalancing = "FundRebalancing",
  ProgramNewsAndUpdates = "ProgramNewsAndUpdates",
  ProgramEndOfPeriod = "ProgramEndOfPeriod"
}
