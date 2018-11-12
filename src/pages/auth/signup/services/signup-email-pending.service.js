import { resendConfirmationLink } from "../actions/signup.actions";

export const sendConfirmationLink = () => (dispatch, getState) => {
  let { email } = getState().emailPending;
  dispatch(resendConfirmationLink({ email }));
};
