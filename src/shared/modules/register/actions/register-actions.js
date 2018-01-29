import { RegisterManagerViewModel } from "gv-api-web";

import history from "../../../../utils/history";
import routes from "../../../../utils/constants/routes";
import swaggerManagerApi from "../../../../services/api-client/swagger-manager-api";

import * as actionTypes from "./register-actions.constants";

const registerUser = registerFormData => {
  return {
    type: actionTypes.REGISTER,
    payload: swaggerManagerApi
      .apiManagerAuthSignUpPostWithHttpInfo({
        model: RegisterManagerViewModel.constructFromObject(registerFormData)
      })
      .then(() => {
        history.push(routes.index);
      })
  };
};

const registerActions = { registerUser };
export default registerActions;
