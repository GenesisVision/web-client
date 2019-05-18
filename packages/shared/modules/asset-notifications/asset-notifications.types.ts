import { MiddlewareDispatch } from "shared/utils/types";

import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps
} from "../notification-settings/actions/notification-settings.actions";

export type TAddNotification = (
  opts: IAddNotificationSettingProps,
  message: string
) => (dispatch: MiddlewareDispatch) => any;

export type TRemoveNotification = (
  opts: IRemoveNotificationSettingProps,
  message: string
) => (dispatch: MiddlewareDispatch) => any;
