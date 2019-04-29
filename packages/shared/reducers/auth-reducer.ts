import { AnyAction } from "redux";
import { UPDATE_TOKEN } from "shared/actions/auth-actions";

export type AuthState = Readonly<{
  isAuthenticated: boolean;
}>;

const initialState = {
  isAuthenticated: false
};

const authReducer = (state = initialState, action: AnyAction) => {
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
