import { AUTH_TOKEN } from '../../utils/const'
// eslint-disable-next-line
import { isAuthenticated } from '../../services/authService';
import httpClient from '../../utils/httpClient';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const requestLogin = (email) => ({
  type: LOGIN_REQUEST,
  email
})

const receiveLogin = (token) => ({
  type: LOGIN_SUCCESS,
  token
})

// eslint-disable-next-line
const loginError = (message) => ({
  type: LOGIN_FAILURE,
  message
})

export const loginUser = ({ email, password }, history) => async dispatch => {
  dispatch(requestLogin(email))
  try{
    const data = await httpClient.post('/api/login', {email, password});
    localStorage.setItem(AUTH_TOKEN, data.token);
    dispatch(receiveLogin(data.token));
    /*if (isAuthenticated(data.token)) {
        dispatch(receiveLogin(data.token));
      } else {
        dispatch(loginError('Token is expired'));
      }*/
  }
  catch(e){
    dispatch(loginError(e));
  }
}
