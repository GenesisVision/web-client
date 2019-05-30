import { push } from "connected-react-router";
import { ForgotPasswordViewModel, ResetPasswordViewModel } from "gv-api-web";
import authActions from "shared/actions/auth-actions";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import emailPendingActions, {
  EMAIL_PENDING
} from "shared/actions/email-pending-actions";
import {
  EMAIL_PENDING_ROUTE,
  PASSWORD_RESTORE_ROUTE
} from "shared/components/auth/forgot-password/forgot-password.routes";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { HOME_ROUTE } from "shared/routes/app.routes";
import authService from "shared/services/auth-service";
import {
  MiddlewareDispatch,
  ResponseError,
  SetSubmittingType,
  TGetState
} from "shared/utils/types";

import {
  forgotPasswordAction,
  restorePasswordAction
} from "../actions/forgot-password.actions";

export const forgotPassword = (data: ForgotPasswordViewModel) => (
  dispatch: MiddlewareDispatch
) =>
  dispatch(forgotPasswordAction(data)).then(() => {
    dispatch(emailPendingActions.saveEmail({ email: data.email }));
    dispatch(push(EMAIL_PENDING_ROUTE));
  });

export const restorePassword = (
  model: ResetPasswordViewModel & { setSubmitting: SetSubmittingType }
) => (dispatch: MiddlewareDispatch) =>
  dispatch(restorePasswordAction(model))
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
    .catch(({ code }: ResponseError) => {
      if (code === "RequiresTwoFactor") {
        dispatch(push(LOGIN_ROUTE));
        dispatch(
          alertMessageActions.success(
            "auth.password-restore.success-alert-message",
            true
          )
        );
      } else model.setSubmitting(false);
    });

export const sendForgotPasswordEmail = () => (
  dispatch: MiddlewareDispatch,
  getState: TGetState
) => {
  let { email } = getState().emailPending;
  dispatch(forgotPassword({ email })).then(() => {
    dispatch(
      alertMessageActions.success(
        "auth.password-restore.resend-email-alert-message",
        true
      )
    );
  });
};

export const navigateToPasswordRestore = () => (
  dispatch: MiddlewareDispatch
) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  dispatch(push(PASSWORD_RESTORE_ROUTE));
};
