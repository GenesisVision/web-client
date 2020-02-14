import { RootThunk } from "utils/types";

import { resendConfirmationLinkAction } from "../actions/signup.actions";

export const sendConfirmationLink = (): RootThunk<void> => (
  dispatch,
  getState
) => {
  let { email } = getState().emailPending;
  dispatch(
    resendConfirmationLinkAction({
      email,
      captchaCheckResult: {
        id: "",
        pow: {
          prefix: ""
        },
        geeTest: {}
      }
    })
  );
};
