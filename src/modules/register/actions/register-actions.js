import { RegisterManagerViewModel } from "gv-api-web";

import history from "../../../utils/history";
import swaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import { HOME_ROUTE } from "../../../components/app.constants";
import * as actionTypes from "./register-actions.constants";

const registerUser = registerFormData => {
  return {
    type: actionTypes.REGISTER,
    payload: swaggerInvestorApi
      .apiInvestorAuthSignUpPostWithHttpInfo({
        model: RegisterManagerViewModel.constructFromObject(registerFormData)
      })
      .then(() => {
        history.push(HOME_ROUTE);
      })
  };
};

const registerActions = { registerUser };
export default registerActions;
