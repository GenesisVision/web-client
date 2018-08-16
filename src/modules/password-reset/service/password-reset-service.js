import { EMAIL_PENDING_ROUTE } from "pages/forgot-password/forgot-password.routes";
import { HOME_ROUTE } from "pages/root.routes";

import authActions from "../../../actions/auth-actions";
import emailPendingActions from "../../../actions/email-pending.actions";
import { EMAIL_PENDING } from "../../../actions/email-pending.actions";
import { RESET_PASSWORD_ROUTE } from "../../../pages/forgot-password/forgot-password.routes";
import authService from "../../../services/auth-service";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";
import { alertMessageActions } from "../../../shared/modules/alert-message/actions/alert-message-actions";
import history from "../../../utils/history";
import passwordResetActions from "../actions/password-reset-actions";

const forgotPassword = data => dispatch => {
  return dispatch(passwordResetActions.forgotPassword(data)).then(() => {
    dispatch(emailPendingActions.saveEmail({ email: data.email }));
    history.push(EMAIL_PENDING_ROUTE);
  });
};

const resetPassword = (userId, code, data) => dispatch => {
  return dispatch(passwordResetActions.resetPassword(userId, code, data)).then(
    response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      history.push(HOME_ROUTE);
      dispatch(
        alertMessageActions.success("Your password changed successfully!")
      );
    }
  );
};

const sendForgotPasswordEmail = () => (dispatch, getState) => {
  let { email } = getState().emailPending;

  dispatch(passwordResetActions.forgotPassword({ email }));
};

const allowResetPassword = () => (dispatch, getState) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  history.push(RESET_PASSWORD_ROUTE);
};

const passwordResetService = {
  forgotPassword,
  resetPassword,
  sendForgotPasswordEmail,
  allowResetPassword
};

export default passwordResetService;
