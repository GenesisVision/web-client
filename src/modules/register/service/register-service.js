import authActions from "../../../actions/auth-actions";
import history from "../../../utils/history";

import { HOME_ROUTE } from "../../../components/app.constants";
import registerActions from "../actions/register-actions";

const register = registerData => dispatch => {
  return dispatch(
    //registerActions.registerUser(registerData)
    Promise.resolve(true)
  ).then(response => {
    history.push(HOME_ROUTE);
  });
};

const registerService = { register };
export default registerService;
