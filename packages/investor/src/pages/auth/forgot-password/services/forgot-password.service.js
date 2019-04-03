import { push } from "connected-react-router";
import { HOME_ROUTE } from "pages/app/app.routes";
import {
  EMAIL_PENDING_ROUTE,
  PASSWORD_RESTORE_ROUTE
} from "pages/auth/forgot-password/forgot-password.routes";
import authActions from "shared/actions/auth-actions";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import { EMAIL_PENDING } from "shared/actions/email-pending-actions";
import emailPendingActions from "shared/actions/email-pending-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import passwordRestoreActions from "../actions/forgot-password.actions";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";

const forgotPassword = data => dispatch => {
  return dispatch(passwordRestoreActions.forgotPassword(data)).then(() => {
    dispatch(emailPendingActions.saveEmail({ email: data.email }));
    dispatch(push(EMAIL_PENDING_ROUTE));
  });
};

const restorePassword = ({ userId, code, data, setSubmitting }) => dispatch => {
  return dispatch(passwordRestoreActions.restorePassword(userId, code, data))
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(push(HOME_ROUTE));
      dispatch(
        alertMessageActions.success(
          "auth.password-restore.success-alert-message",
          true
        )
      );
    })
    .catch(e => {
      if (e.code === "RequiresTwoFactor") {
        dispatch(push(LOGIN_ROUTE));
        dispatch(
          alertMessageActions.success(
            "auth.password-restore.success-alert-message",
            true
          )
        );
      } else {
        setSubmitting(false);
      }
    });
};

const sendForgotPasswordEmail = () => (dispatch, getState) => {
  let { email } = getState().emailPending;

  dispatch(passwordRestoreActions.forgotPassword({ email })).then(() => {
    dispatch(
      alertMessageActions.success(
        "auth.password-restore.resend-email-alert-message",
        true
      )
    );
  });
};

const navigateToPasswordRestore = () => (dispatch, getState) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  dispatch(push(PASSWORD_RESTORE_ROUTE));
};

const forgotPasswordService = {
  forgotPassword,
  restorePassword,
  sendForgotPasswordEmail,
  navigateToPasswordRestore
};

export default forgotPasswordService;
