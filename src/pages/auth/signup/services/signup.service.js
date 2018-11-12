import emailPendingActions from "actions/email-pending-actions";
import { push } from "react-router-redux";

import { signUpUser } from "../actions/signup.actions";
import { SIGNUP_ROUTE_PENDING } from "../signup.routes";

export const signUp = (signUpData, setSubmitting) => dispatch => {
  return dispatch(signUpUser(signUpData))
    .then(() => {
      dispatch(emailPendingActions.saveEmail(signUpData));
      dispatch(push(SIGNUP_ROUTE_PENDING));
    })
    .catch(() => {
      setSubmitting(false);
    });
};

// const confirmEmail = () => (dispatch, getState) => {
//   dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
//   dispatch(push(DASHBOARD_ROUTE));
// };
