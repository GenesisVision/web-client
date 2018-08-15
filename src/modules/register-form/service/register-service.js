import history from "../../../utils/history";
import { EMAIL_CONFIRM_PENDING_ROUTE } from "../../email-confirm/email-confirm.constants";
import registerActions from "../actions/register-actions";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";
import emailPendingActions, {
  EMAIL_PENDING
} from "../../../actions/email-pending.actions";
import { DASHBOARD_ROUTE } from "../../../pages/dashboard/dashboard.routes";

const register = registerData => dispatch => {
  console.log("данные, которые летят в регистрацию");
  console.dir(registerData);
  dispatch(emailPendingActions.saveEmail(registerData));
  return dispatch(registerActions.registerUser(registerData)).then(() => {
    dispatch(emailPendingActions.saveEmail(registerData));
    history.push(EMAIL_CONFIRM_PENDING_ROUTE);
  });
};

const sendSignUpEmail = () => (dispatch, getState) => {
  let { email } = getState().emailPending;

  // тут будет отправка емеила как в sign-up
  // passwordResetActions.forgotPassword({ email });
};

const confirmEmail = () => (dispatch, getState) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  history.push(DASHBOARD_ROUTE);
};

const registerService = { register, sendSignUpEmail, confirmEmail };
export default registerService;
