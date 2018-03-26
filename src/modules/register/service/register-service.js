import history from "../../../utils/history";
import registerActions from "../actions/register-actions";

import { EMAIL_CONFIRM_PENDING_ROUTE } from "../../email-confirm/email-confirm.constants";

const register = registerData => dispatch => {
  return dispatch(registerActions.registerUser(registerData)).then(() => {
    history.push(EMAIL_CONFIRM_PENDING_ROUTE);
  });
};

const registerService = { register };
export default registerService;
