import emailPendingActions from "actions/email-pending-actions";
import { Push } from "components/link/link";
import { RegisterViewModel } from "gv-api-web";

import { signUpUserAction } from "../actions/signup.actions";
import { SIGNUP_ROUTE_PENDING } from "../signup.constants";

export const signUp: SingUpFuncType = ({
  utmSource,
  userName,
  email,
  password,
  confirmPassword,
  refCode,
  isAuto,
  captchaCheckResult
}) => (dispatch: any) =>
  dispatch(
    signUpUserAction({
      utmSource,
      userName,
      email,
      password,
      confirmPassword,
      refCode,
      isAuto,
      captchaCheckResult
    })
  ).then(() => {
    dispatch(emailPendingActions.saveEmail({ email }));
    Push(SIGNUP_ROUTE_PENDING);
  });

export type SingUpFuncType = (
  props: RegisterViewModel
) => (dispatch: any, getState: any) => Promise<void>;
