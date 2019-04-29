import { RootThunk } from "shared/utils/types";

import { resendConfirmationLink } from "../actions/signup.actions";

export const sendConfirmationLink = (): RootThunk<void> => (
  dispatch,
  getState
) => {
  let { email } = getState().emailPending;
  dispatch(resendConfirmationLink({ email }));
};
