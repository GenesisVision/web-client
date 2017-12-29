import { login } from '../../services/authService'

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
    const data = await login(email, password);    
    dispatch(receiveLogin(data.token));
  }
  catch(e){
    dispatch(loginError(e));
  }
}
