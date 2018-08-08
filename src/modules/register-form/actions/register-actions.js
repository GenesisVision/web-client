import authApi from "services/api-client/auth-api";

import * as actionTypes from "./register-actions.constants";

const registerUser = model => ({
  type: actionTypes.REGISTER,
  payload: authApi.v10AuthSignupInvestorPost({ model })
});

const registerActions = { registerUser };
export default registerActions;
