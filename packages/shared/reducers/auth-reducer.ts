import {
  UPDATE_TOKEN,
  UpdateTokenActionType
} from "shared/actions/auth-actions";
import authService from "shared/services/auth-service";

import defaultReducer from "./reducer-creators/default-reducer";

export type AuthState = Readonly<{
  isAuthenticated: boolean;
}>;

const getInitialState = (): AuthState => ({
  isAuthenticated: authService.isAuthenticated()
});

const authReducer = (
  state = getInitialState(),
  action: UpdateTokenActionType
): AuthState =>
  defaultReducer<UpdateTokenActionType, AuthState>(
    action,
    state,
    getInitialState(),
    UPDATE_TOKEN
  );

export default authReducer;
