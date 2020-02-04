import { Push } from "components/link/link";
import { AuthState } from "reducers/auth-reducer";
import { Action } from "redux";
import { HOME_ROUTE } from "routes/app.routes";
import { ActionType } from "utils/types";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const LOGOUT = "LOGOUT";
export type UpdateTokenActionType = ActionType<AuthState>;

const alreadyAuthenticated = () => {
  Push(HOME_ROUTE);
};

const updateTokenAction = (
  isAuthenticated: boolean
): UpdateTokenActionType => ({
  type: UPDATE_TOKEN,
  payload: { isAuthenticated }
});

const logoutAction = (): Action => ({
  type: LOGOUT
});

const authActions = { updateTokenAction, alreadyAuthenticated, logoutAction };
export default authActions;
