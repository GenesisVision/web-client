import { CaptchaCheckResult } from "gv-api-web";
import emailPendingActions from "shared/actions/email-pending-actions";
import { Push } from "shared/components/link/link";
import { SetSubmittingType } from "shared/utils/types";

import { RegisterViewModel, signUpUserAction } from "../actions/signup.actions";
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
  props: RegisterViewModel & {
    code: string;
    userName?: string;
    captchaCheckResult: CaptchaCheckResult;
  },
  setSubmitting: SetSubmittingType
) => (dispatch: any, getState: any) => void;
