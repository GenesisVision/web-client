import emailPendingActions from "actions/email-pending-actions";
import { Push } from "components/link/link";
import { RegisterViewModel } from "gv-api-web";
import { SetSubmittingType } from "utils/types";

import { signUpUserAction } from "../actions/signup.actions";
import { SIGNUP_ROUTE_PENDING } from "../signup.constants";

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
      Push(SIGNUP_ROUTE_PENDING);
    })
    .catch(() => {
      setSubmitting!(false);
    });

export type SingUpFuncType = (
  props: RegisterViewModel,
  setSubmitting: SetSubmittingType
) => (dispatch: any, getState: any) => void;
