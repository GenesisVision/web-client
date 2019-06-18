import { Dispatch } from "redux";
import { fetchTwoFactorAction } from "shared/actions/2fa-actions";
import { notificationsToggleAction } from "shared/components/notifications/actions/notifications.actions";
import { TGetState } from "shared/utils/types";

import { fetchProfileHeaderInfoAction } from "./actions/header-actions";

export const fetchProfileHeaderInfo = () => (dispatch: Dispatch) => {
  dispatch(fetchProfileHeaderInfoAction());
};
export const notificationsToggle = () => (
  dispatch: Dispatch,
  getState: TGetState
) => {
  const { isOpen } = getState().notifications;
  dispatch(notificationsToggleAction(!isOpen));
};
export const fetchTwoFactor = () => (dispatch: Dispatch) => {
  dispatch(fetchTwoFactorAction());
};
