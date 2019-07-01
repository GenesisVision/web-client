import { push } from "connected-react-router";
import emailPendingActions from "shared/actions/email-pending-actions";
import { SetSubmittingType } from "shared/utils/types";
import { string } from "yup";

import { RegisterViewModel, signUpUserAction } from "../actions/signup.actions";
import { SIGNUP_ROUTE_PENDING } from "../signup.routes";

export const signUp: SingUpFuncType = props => (dispatch: any) => {
  const {
    userName,
    email,
    password,
    confirmPassword,
    refCode,
    isAuto,
    prefix,
    id,
    setSubmitting
  } = props;
  return dispatch(
    signUpUserAction({
      userName,
      email,
      password,
      confirmPassword,
      refCode,
      isAuto,
      captchaCheckResult: {
        id,
        pow: {
          prefix
        },
        geeTest: {}
      }
    })
  )
    .then(() => {
      dispatch(emailPendingActions.saveEmail({ email }));
      dispatch(push(SIGNUP_ROUTE_PENDING));
    })
    .catch(() => {
      setSubmitting!(false);
    });
};

export type SingUpFuncType = (
  props: RegisterViewModel & {
    id: string;
    prefix: string;
    code: string;
    setSubmitting?: SetSubmittingType;
    userName?: string;
  }
) => (dispatch: any, getState: any) => void;
