import { HOME_ROUTE } from "pages/app/app.routes";
import authService from "shared/services/auth-service";
import history from "shared/utils/history";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const LOGOUT = "LOGOUT";

const alreadyAuthenticated = () => {
  history.push(HOME_ROUTE);
};

const updateToken = () => ({
  type: UPDATE_TOKEN,
  isAuthenticated: authService.isAuthenticated(),
  userName: authService.getUserName()
});

const logout = () => ({
  type: LOGOUT
});

const authActions = { updateToken, alreadyAuthenticated, logout };
export default authActions;
