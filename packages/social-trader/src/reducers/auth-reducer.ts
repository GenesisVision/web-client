import {
  LOGOUT,
  UPDATE_TOKEN,
  UpdateTokenActionType
} from "actions/auth-actions";
import { fieldSelector } from "utils/selectors";

import defaultReducer from "./reducer-creators/default-reducer";

export type AuthState = Readonly<{
  isAuthenticated: boolean;
}>;

const initialState: AuthState = {
  isAuthenticated: false
};

export const isAuthenticatedSelector = fieldSelector(
  state => state.authData.isAuthenticated
);

const authReducer = (
  state = initialState,
  action: UpdateTokenActionType
): AuthState =>
  defaultReducer<UpdateTokenActionType, AuthState>(
    action,
    state,
    initialState,
    UPDATE_TOKEN
  );

export default authReducer;
