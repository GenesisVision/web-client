import authService from '../services/authService'
import history from '../utils/history'
import routes from '../utils/constants/routes'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const requestLogin = () => ({
  type: LOGIN_REQUEST
})

const receiveLogin = (username) => ({
  type: LOGIN_SUCCESS,
  username
})

const loginError = (message) => ({
  type: LOGIN_FAILURE,
  message
})

const loginUser = (user, from) => async dispatch => {
  const { username } = user;
  dispatch(requestLogin())
  try {
    await authService.login(user);
    dispatch(receiveLogin(username));
    history.push(from.pathname);
  }
  catch (e) {
    dispatch(loginError(e.message));
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

const logoutUser = () => dispatch => {
  dispatch(logoutRequest());
  authService.logout();
  history.push(routes.index);
  dispatch(logoutSuccess());
}

const loginActions = {
  loginUser,
  logoutUser
}

export default loginActions
