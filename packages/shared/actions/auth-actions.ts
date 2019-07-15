import Router from "next/router";
import { Action } from "redux";
import { AuthState } from "shared/reducers/auth-reducer";
import { HOME_ROUTE } from "shared/routes/app.routes";
import authService from "shared/services/auth-service";
// import history from "shared/utils/history";
import { ActionType } from "shared/utils/types";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const LOGOUT = "LOGOUT";
export type UpdateTokenActionType = ActionType<AuthState>;

const alreadyAuthenticated = () => {
  Router.push(HOME_ROUTE);
};

const updateTokenAction = (): UpdateTokenActionType => ({
  type: UPDATE_TOKEN,
  payload: { isAuthenticated: authService.isAuthenticated() }
});

const logoutAction = (): Action => ({
  type: LOGOUT
});

const authActions = { updateTokenAction, alreadyAuthenticated, logoutAction };
export default authActions;
