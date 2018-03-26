import { RegisterManagerViewModel } from "gv-api-web";

import swaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./register-actions.constants";

const registerUser = registerData => ({
  type: actionTypes.REGISTER,
  payload: swaggerInvestorApi.apiInvestorAuthSignUpPostWithHttpInfo({
    model: RegisterManagerViewModel.constructFromObject(registerData)
  })
});

const registerActions = { registerUser };
export default registerActions;
