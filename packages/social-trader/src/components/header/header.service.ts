import { fetchTwoFactorAction } from "actions/2fa-actions";
import { notificationsToggleAction } from "components/notifications/actions/notifications.actions";
import { Dispatch } from "redux";

import { fetchProfileHeaderInfoAction } from "./actions/header-actions";

export const fetchProfileHeaderInfo = (dispatch: Dispatch) => {
  dispatch(fetchProfileHeaderInfoAction());
};
export const notificationsToggle = (isOpen: boolean) => (
  dispatch: Dispatch
) => {
  dispatch(notificationsToggleAction(!isOpen));
};
export const fetchTwoFactor = (dispatch: Dispatch) => {
  dispatch(fetchTwoFactorAction());
};
