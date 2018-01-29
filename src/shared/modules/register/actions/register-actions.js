import {
  ManagerApi,
  RegisterManagerViewModel
} from "gv-api-web";
import { apiClientPublic } from "../../../../services/api-client/swagger-custom-client";
import history from "../../../../utils/history";
import routes from "../../../../utils/constants/routes";
import * as actionTypes from "./register-actions.constants";

export const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST
});

export const registerSuccess = email => ({
  type: actionTypes.REGISTER_SUCCESS,
  email
});

export const registerError = message => ({
  type: actionTypes.REGISTER_FAILURE,
  message
});

const registerUser = user => async dispatch => {
  const { email } = user;
  dispatch(registerRequest());
  try {
    const api = new ManagerApi(apiClientPublic());
    const opts = {
      model: RegisterManagerViewModel.constructFromObject(user)
    };

    await api.apiManagerAuthSignUpPostWithHttpInfo(opts);
    history.push(routes.index);
    dispatch(registerSuccess(email));
  } catch (e) {
    const error = JSON.parse(e.response.text);
    dispatch(registerError(error.errors[0].message));
    throw new Error(error.errors[0].message);
  }
};

const registerActions = { registerUser };
export { registerActions };
