import { push } from "connected-react-router";

import { LOGIN_ROUTE } from "./constants";

// import { Dispatch } from "redux";

export const redirectToLogin = () => {
  push(LOGIN_ROUTE);
};
