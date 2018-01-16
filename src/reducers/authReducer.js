import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/loginActions'
import authService from '../services/authService'
import { registerActionTypes} from '../actions/registerActions/registerActions'

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
    case registerActionTypes.success:
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
