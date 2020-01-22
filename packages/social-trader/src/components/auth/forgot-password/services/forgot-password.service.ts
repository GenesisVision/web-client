import authActions from "actions/auth-actions";
import clearDataActionFactory from "actions/clear-data.factory";
import emailPendingActions, {
  EMAIL_PENDING
} from "actions/email-pending-actions";
import {
  EMAIL_PENDING_ROUTE,
  PASSWORD_RESTORE_ROUTE
} from "components/auth/forgot-password/forgot-password.routes";
import { Push } from "components/link/link";
import {
  CaptchaCheckResult,
  ForgotPasswordViewModel,
  ResetPasswordViewModel
} from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { Dispatch } from "redux";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";
import { MiddlewareDispatch, SetSubmittingType, TGetState } from "utils/types";

import { forgotPasswordAction } from "../actions/forgot-password.actions";

export const forgotPassword = (data: ForgotPasswordViewModel) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(forgotPasswordAction(data)).then(() => {
    dispatch(emailPendingActions.saveEmail(data));
    Push(EMAIL_PENDING_ROUTE);
  });

export const restorePassword = (
  model: ResetPasswordViewModel & { setSubmitting: SetSubmittingType }
) => (dispatch: MiddlewareDispatch) =>
  authApi.resetPassword({ body: model }).then(response => {
    authService.storeToken(response);
    dispatch(authActions.updateTokenAction(true));
    // Push(HOME_ROUTE);
  });

export const sendForgotPasswordEmail = (
  captchaCheckResult: CaptchaCheckResult
) => (dispatch: MiddlewareDispatch, getState: TGetState) => {
  let { email } = getState().emailPending;
  dispatch(
    forgotPassword({
      email,
      captchaCheckResult
    })
  ).then(() => {
    dispatch(
      alertMessageActions.success(
        "auth.password-restore.resend-email-alert-message",
        true
      )
    );
  });
};

export const navigateToPasswordRestore = () => (dispatch: Dispatch) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  Push(PASSWORD_RESTORE_ROUTE);
};
