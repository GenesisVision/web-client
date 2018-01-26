
import authService from '../services/authService'
import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../shared/login/actions/constants";
import {REGISTER_SUCCESS} from "../shared/register/actions/constants";

const initialState = {
  isAuthenticated: authService.isAuthenticated(),
  username: authService.getUserName()
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: action.username
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: action.username
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: ''
      }
    default:
      return state
  }
}

export default authReducer
