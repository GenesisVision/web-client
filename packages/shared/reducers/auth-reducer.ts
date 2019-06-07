import {
  UPDATE_TOKEN,
  UpdateTokenActionType
} from "shared/actions/auth-actions";
import authService from "shared/services/auth-service";

export type AuthState = Readonly<{
  isAuthenticated: boolean;
}>;

const getInitialState = () => ({
  isAuthenticated: authService.isAuthenticated()
});

const authReducer = (
  state = getInitialState(),
  action: UpdateTokenActionType
) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        isAuthenticated: action.payload || false
      };
    default:
      return state;
  }
};

export default authReducer;
