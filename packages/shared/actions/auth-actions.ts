import { Action } from "redux";
import { HOME_ROUTE } from "shared/routes/app.routes";
import authService from "shared/services/auth-service";
import history from "shared/utils/history";
import { ActionType } from "shared/utils/types";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const LOGOUT = "LOGOUT";
export type UpdateTokenActionType = ActionType<boolean>;

const alreadyAuthenticated = () => {
  history.push(HOME_ROUTE);
};

const updateTokenAction = (): UpdateTokenActionType => ({
  type: UPDATE_TOKEN,
  payload: authService.isAuthenticated()
});

const logoutAction = (): Action => ({
  type: LOGOUT
});

const authActions = { updateTokenAction, alreadyAuthenticated, logoutAction };
export default authActions;
