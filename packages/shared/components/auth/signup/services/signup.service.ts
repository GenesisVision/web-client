import { push } from "connected-react-router";
import { RegisterViewModel } from "gv-api-web";
import emailPendingActions from "shared/actions/email-pending-actions";
import { SetSubmittingType } from "shared/utils/types";

import { signUpUserAction } from "../actions/signup.actions";
import { SIGNUP_ROUTE_PENDING } from "../signup.routes";

export const signUp: SingUpFuncType = (
  {
    userName,
    email,
    password,
    confirmPassword,
    refCode,
    isAuto,
    captchaCheckResult
  },
  setSubmitting
) => (dispatch: any) =>
  dispatch(
    signUpUserAction({
      userName,
      email,
      password,
      confirmPassword,
      refCode,
      isAuto,
      captchaCheckResult
    })
  )
    .then(() => {
      dispatch(emailPendingActions.saveEmail({ email }));
      dispatch(push(SIGNUP_ROUTE_PENDING));
    })
    .catch(() => {
      setSubmitting!(false);
    });

export type SingUpFuncType = (
  props: RegisterViewModel,
  setSubmitting: SetSubmittingType
) => (dispatch: any, getState: any) => void;
