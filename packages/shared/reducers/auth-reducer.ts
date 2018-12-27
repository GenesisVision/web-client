import { UPDATE_TOKEN } from "shared/actions/auth-actions";
import authService from "shared/services/auth-service";

export interface IAuthReducer {
  isAuthenticated: boolean;
}

const initialState = {
  isAuthenticated: authService.isAuthenticated()
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        isAuthenticated: action.isAuthenticated
      };
    default:
      return state;
  }
};

export default authReducer;
