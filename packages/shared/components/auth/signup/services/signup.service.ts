import { push } from "connected-react-router";
import emailPendingActions from "shared/actions/email-pending-actions";
import { RootThunk, SetSubmittingType } from "shared/utils/types";

import { RegisterViewModel, signUpUserAction } from "../actions/signup.actions";
import { SIGNUP_ROUTE_PENDING } from "../signup.routes";

export const signUp = (
  signUpData: RegisterViewModel,
  setSubmitting: SetSubmittingType
): RootThunk<any> => (dispatch: any) => {
  return dispatch(signUpUserAction(signUpData))
    .then(() => {
      dispatch(emailPendingActions.saveEmail(signUpData));
      dispatch(push(SIGNUP_ROUTE_PENDING));
    })
    .catch(() => {
      setSubmitting(false);
    });
};
