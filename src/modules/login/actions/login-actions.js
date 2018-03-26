import { LoginViewModel } from "gv-api-web";

import swaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./login-actions.constants";

const loginUser = loginData => ({
  type: actionTypes.LOGIN,
  payload: swaggerInvestorApi.apiInvestorAuthSignInPostWithHttpInfo({
    model: LoginViewModel.constructFromObject(loginData)
  })
});

const loginActions = {
  loginUser
};

export default loginActions;
