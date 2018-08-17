import authActions from "actions/auth-actions";
import emailPendingActions from "actions/email-pending-actions";
import { EMAIL_PENDING } from "actions/email-pending-actions";
import { EMAIL_PENDING_ROUTE } from "pages/forgot-password/forgot-password.routes";
import { PASSWORD_RESTORE_ROUTE } from "pages/forgot-password/forgot-password.routes";
import { HOME_ROUTE } from "pages/root.routes";
import { push } from "react-router-redux";
import authService from "services/auth-service";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import passwordRestoreActions from "../actions/password-restore-actions";

const forgotPassword = data => dispatch => {
  return dispatch(passwordRestoreActions.forgotPassword(data)).then(() => {
    dispatch(emailPendingActions.saveEmail({ email: data.email }));
    dispatch(push(EMAIL_PENDING_ROUTE));
  });
};

const restorePassword = (userId, code, data) => dispatch => {
  return dispatch(
    passwordRestoreActions.restorePassword(userId, code, data)
  ).then(response => {
    authService.storeToken(response.value);
    dispatch(authActions.updateToken());
    dispatch(push(HOME_ROUTE));
    dispatch(
      alertMessageActions.success("Your password changed successfully!")
    );
  });
};

const sendForgotPasswordEmail = () => (dispatch, getState) => {
  let { email } = getState().emailPending;

  dispatch(passwordRestoreActions.forgotPassword({ email }));
};

const navigateToPasswordRestore = () => (dispatch, getState) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  dispatch(push(PASSWORD_RESTORE_ROUTE));
};

const passwordRestoreService = {
  forgotPassword,
  restorePassword,
  sendForgotPasswordEmail,
  navigateToPasswordRestore
};

export default passwordRestoreService;
