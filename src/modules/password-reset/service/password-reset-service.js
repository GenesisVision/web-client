import { EMAIL_PENDING_ROUTE } from "pages/forgot-password/forgot-password.routes";
import { HOME_ROUTE } from "pages/root.routes";

import authActions from "../../../actions/auth-actions";
import authService from "../../../services/auth-service";
import { alertMessageActions } from "../../../shared/modules/alert-message/actions/alert-message-actions";
import history from "../../../utils/history";
import passwordResetActions from "../actions/password-reset-actions";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";
import { EMAIL_RESET_PASSWORD } from "../actions/password-reset-actions.constants";
import { RESET_PASSWORD_ROUTE } from "pages/forgot-password/reset-password/reset-password";

const forgotPassword = data => dispatch => {
  return dispatch(passwordResetActions.forgotPassword(data)).then(() => {
    dispatch(
      passwordResetActions.storeEmailResetPassword({ email: data.email })
    );
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
  let { email } = getState().passwordResetData.forgot;

  passwordResetActions.forgotPassword({ email });
};

const allowResetPassword = () => (dispatch, getState) => {
  dispatch(clearDataActionFactory(EMAIL_RESET_PASSWORD).clearData());
  history.push(RESET_PASSWORD_ROUTE);
};

const passwordResetService = {
  forgotPassword,
  resetPassword,
  sendForgotPasswordEmail,
  allowResetPassword
};

export default passwordResetService;
