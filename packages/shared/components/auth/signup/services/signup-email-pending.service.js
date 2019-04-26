import { resendConfirmationLink } from "../actions/signup.actions";

export const sendConfirmationLink = () => (dispatch, getState) => {
  console.log(111);
  let { email } = getState().emailPending;
  dispatch(resendConfirmationLink({ email }));
};
