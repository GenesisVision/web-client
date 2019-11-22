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
import Router from "next/router";
import { Dispatch } from "redux";
import { HOME_ROUTE, LOGIN_ROUTE } from "routes/app.routes";
import authService from "services/auth-service";
import {
  MiddlewareDispatch,
  ResponseError,
  SetSubmittingType,
  TGetState
} from "utils/types";

import {
  forgotPasswordAction,
  restorePasswordAction
} from "../actions/forgot-password.actions";

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
  dispatch(restorePasswordAction(model))
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateTokenAction(true));
      Push(HOME_ROUTE);
      dispatch(
        alertMessageActions.success(
          "auth.password-restore.success-alert-message",
          true
        )
      );
    })
    .catch(({ code }: ResponseError) => {
      if (code === "RequiresTwoFactor") {
        Push(LOGIN_ROUTE);
        dispatch(
          alertMessageActions.success(
            "auth.password-restore.success-alert-message",
            true
          )
        );
      } else model.setSubmitting(false);
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
