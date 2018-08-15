import authApi from "services/api-client/auth-api";

export const LOGIN = "LOGIN";
export const LOGIN_TWO_FACTOR = "LOGIN_TWO_FACTOR";

const loginUser = loginData => ({
  type: LOGIN,
  payload: authApi.v10AuthSigninInvestorPost({
    model: loginData
  })
});

const storeTwoFactor = ({ email, password, from }) => ({
  type: LOGIN_TWO_FACTOR,
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
