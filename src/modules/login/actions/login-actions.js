import authApi from "services/api-client/auth-api";

import * as actionTypes from "./login-actions.constants";

const loginUser = loginData => ({
  type: actionTypes.LOGIN,
  payload: authApi.v10AuthSigninInvestorPost({
    model: loginData
  })
});

const storeTwoFactor = ({ email, password, from }) => ({
  type: actionTypes.LOGIN_TWO_FACTOR,
  payload: {
    email,
    password,
    from
  }
});

const loginActions = {
  loginUser,
  storeTwoFactor
};

export default loginActions;
