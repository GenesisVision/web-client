import { Dispatch } from "redux";
import { fetchTwoFactorAction } from "shared/actions/2fa-actions";
import { notificationsToggleAction } from "shared/components/notifications/actions/notifications.actions";

import { fetchProfileHeaderInfoAction } from "./actions/header-actions";

export const fetchProfileHeaderInfo = () => (dispatch: Dispatch) => {
  dispatch(fetchProfileHeaderInfoAction());
};
export const notificationsToggle = () => (dispatch: Dispatch) => {
  dispatch(notificationsToggleAction());
};
export const fetchTwoFactor = () => (dispatch: Dispatch) => {
  dispatch(fetchTwoFactorAction());
};
