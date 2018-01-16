import authService from "../../services/authService"
import history from '../../utils/history'
import routes from "../../utils/constants/routes"

const registerActionTypes = {
  request: 'REGISTER_REQUEST',
  success: 'REGISTER_SUCCESS',
  failure: 'REGISTER_FAILURE'
}

export const registerRequest = () => ({
  type: registerActionTypes.request
})

export const registerSuccess = (username) => ({
  type: registerActionTypes.success,
  username
})

export const registerError = (message) => ({
  type: registerActionTypes.failure,
  message
})

const registerUser = (user) => async (dispatch) => {
  const { username } = user;
  dispatch(registerRequest())
  try {
    await authService.register(user);
    history.push(routes.index);    
    dispatch(registerSuccess(username));
  }
  catch (e) {
    dispatch(registerError(e.message));
  }
}

const registerActions = { registerUser }
export { registerActions, registerActionTypes }
