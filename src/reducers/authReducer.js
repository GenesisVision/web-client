import { AUTH_TOKEN } from '../utils/const'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/auth/loginActions'
import { LOGOUT_SUCCESS } from '../actions/auth/logoutActions'
import { isAuthenticated } from '../services/authService';

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(localStorage.getItem(AUTH_TOKEN))
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        email: action.email
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    default:
      return state
  }
}

export default authReducer
