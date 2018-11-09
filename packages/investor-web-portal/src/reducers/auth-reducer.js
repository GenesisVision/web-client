import authService from "../services/auth-service";
import { UPDATE_TOKEN } from "../actions/auth-actions";

const initialState = {
  isAuthenticated: authService.isAuthenticated(),
  username: authService.getUserName()
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        isAuthenticated: action.isAuthenticated,
        username: authService.username
      };
    default:
      return state;
  }
};

export default authReducer;
