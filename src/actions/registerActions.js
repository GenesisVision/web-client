import authService from "../services/authService"
import history from '../utils/history'
import routes from "../utils/constants/routes"

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

const registerRequest = () => ({
  type: REGISTER_REQUEST
})

const registerReceive = (username) => ({
  type: REGISTER_SUCCESS,
  username
})

const registerError = (message) => ({
  type: REGISTER_FAILURE,
  message
})

const registerUser = (user) => async (dispatch) => {
  const { username } = user;
  dispatch(registerRequest())
  try {
    await authService.register(user);
    dispatch(registerReceive(username));
    history.push(routes.index);
  }
  catch (e) {
    dispatch(registerError(e.message));
  }
}

const registerActions = { registerUser }
export default registerActions
