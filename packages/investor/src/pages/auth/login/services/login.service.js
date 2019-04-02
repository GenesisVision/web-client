import { push } from "connected-react-router";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/login/login.routes";
import { setTwoFactorRequirement } from "shared/actions/2fa-actions";
import authActions from "shared/actions/auth-actions";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import authService from "shared/services/auth-service";

import { loginUser } from "../actions/login.actions";
import {
  LOGIN,
  LOGIN_TWO_FACTOR,
  RECOVERY_CODE,
  storeTwoFactor,
  TWO_FACTOR_CODE
} from "shared/components/auth/login/login.actions";
import { clearTwoFactorData } from "shared/components/auth/login/login.service";

export const CLIENT_WEB = "Web";

export const login = (loginData, from, setSubmitting) => dispatch => {
  return dispatch(loginUser({ ...loginData, client: CLIENT_WEB }))
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(push(from));
    })
    .catch(e => {
      if (e.code === "RequiresTwoFactor") {
        dispatch(
          storeTwoFactor({
            ...loginData,
            from
          })
        );
        dispatch(setTwoFactorRequirement(true));
        dispatch(push(LOGIN_ROUTE_TWO_FACTOR_ROUTE));
      } else {
        setSubmitting(false);
      }
    });
};

export const twoFactorLogin = (code, type, setSubmitting) => (
  dispatch,
  getState
) => {
  const { email, password, from } = getState().loginData.twoFactor;
  const model = {
    email,
    password,
    client: CLIENT_WEB
  };
  if (type === TWO_FACTOR_CODE) {
    model.twoFactorCode = code;
  }
  if (type === RECOVERY_CODE) {
    model.recoveryCode = code;
  }

  const request = dispatch(loginUser(model));

  request
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(clearTwoFactorData());
      dispatch(push(from));
    })
    .catch(() => setSubmitting(false));

  return request;
};
