import history from "../../../utils/history";
import { EMAIL_CONFIRM_PENDING_ROUTE } from "../../email-confirm/email-confirm.constants";
import registerActions from "../actions/register-actions";

const register = registerData => dispatch => {
  return dispatch(registerActions.registerUser(registerData)).then(() => {
    history.push(EMAIL_CONFIRM_PENDING_ROUTE);
  });
};

const registerService = { register };
export default registerService;
