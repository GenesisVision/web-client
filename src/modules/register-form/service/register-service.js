import emailPendingActions, {
  EMAIL_PENDING
} from "../../../actions/email-pending.actions";
import { DASHBOARD_ROUTE } from "../../../pages/dashboard/dashboard.routes";
import { REGISTER_ROUTE_PENDING } from "../../../pages/signup/signup.routes";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";
import history from "../../../utils/history";
import registerActions from "../actions/register-actions";

const register = registerData => dispatch => {
  return dispatch(registerActions.registerUser(registerData)).then(() => {
    dispatch(emailPendingActions.saveEmail(registerData));
    history.push(REGISTER_ROUTE_PENDING);
  });
};

const resendConfirmationLink = () => (dispatch, getState) => {
  let { email } = getState().emailPending;
  dispatch(registerActions.resendConfirmationLink({ email }));
};

const confirmEmail = () => (dispatch, getState) => {
  dispatch(clearDataActionFactory(EMAIL_PENDING).clearData());
  history.push(DASHBOARD_ROUTE);
};

const registerService = { register, resendConfirmationLink, confirmEmail };
export default registerService;
