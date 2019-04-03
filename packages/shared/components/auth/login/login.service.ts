import { push } from "connected-react-router";

import { LOGIN_ROUTE, LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "./login.routes";
import platformApi from "shared/services/api-client/platform-api";
import authService from "shared/services/auth-service";
import authActions from "shared/actions/auth-actions";
import { setTwoFactorRequirement } from "shared/actions/2fa-actions";
import { Dispatch } from "redux";
import {
  CODE_TYPE,
  LOGIN,
  LOGIN_TWO_FACTOR,
  storeTwoFactor
} from "./login.actions";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import { HOME_ROUTE } from "shared/routes/app.routes";
import SHA256 from "sha256";

export const CLIENT_WEB = "Web";
export const redirectToLogin = () => {
  push(LOGIN_ROUTE);
};
const maxTarget = 26959535291011309493156476344723991336010898738574164086137773096960;

const calculateHash = ({
  difficulty,
  nonce,
  login,
  setCount
}: {
  difficulty: number;
  nonce: string;
  login: string;
  setCount: (val: number) => void;
}): number => {
  let prefix = 0;
  difficulty = 2;
  const diffString = [
    ...Array(difficulty).fill(0),
    ...Array(64 - difficulty).fill("F")
  ].join("");
  while (SHA256(`${prefix}${nonce}${login}`) >= diffString) {
    setCount(prefix);
    prefix++;
  }
  return prefix;
};

export const login: LoginFuncType = (
  loginData,
  from,
  setSubmitting,
  loginUserMethod,
  setCount,
  setTotal
) => dispatch => {
  return platformApi
    .v10PlatformRiskcontrolGet(loginData.email, { device: CLIENT_WEB })
    .then(response => {
      const { loginCheckDetails, id } = response;
      setTotal(Math.pow(16, loginCheckDetails.details.difficulty));
      let prefix;
      switch (loginCheckDetails.type) {
        case "PoW":
          prefix = calculateHash({
            ...loginCheckDetails.details,
            login: loginData.email,
            setCount
          });
          break;
        case "None":
        case "CaptchaGeeTest":
        default:
          prefix = 0;
      }
      return dispatch(
        loginUserMethod({
          ...loginData,
          client: CLIENT_WEB,
          prefix,
          captchaId: id
        })
      );
    })
    .then((response: any) => {
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

export const twoFactorLogin: TwoFactorLoginFuncType = (
  code,
  type,
  setSubmitting,
  loginUserMethod,
  setCount,
  setTotal
) => (dispatch, getState) => {
  const { email, password, from } = getState().loginData.twoFactor;
  const model = {
    email,
    password,
    client: CLIENT_WEB,
    twoFactorCode: "",
    recoveryCode: "",
    captchaId: "",
    prefix: 0
  };
  if (type === CODE_TYPE.TWO_FACTOR) {
    model.twoFactorCode = code;
  }
  if (type === CODE_TYPE.RECOVERY) {
    model.recoveryCode = code;
  }
  return platformApi
    .v10PlatformRiskcontrolGet(email, { device: CLIENT_WEB })
    .then(response => {
      const { loginCheckDetails, id } = response;
      setTotal(maxTarget / loginCheckDetails.details.difficulty);
      let prefix;
      switch (loginCheckDetails.type) {
        case "PoW":
          prefix = calculateHash({
            ...loginCheckDetails.details,
            login: email,
            setCount
          });
          break;
        case "None":
        case "CaptchaGeeTest":
        default:
          prefix = 0;
      }
      model.captchaId = id;
      model.prefix = prefix;
      return dispatch(loginUserMethod(model))
        .then((response: { value: string }) => {
          authService.storeToken(response.value);
          dispatch(authActions.updateToken());
          dispatch(clearTwoFactorData());
          dispatch(push(from));
        })
        .catch(() => setSubmitting(false));
    });
};

export const clearLoginData: clearLoginDataFuncType = () => dispatch => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};

export const clearTwoFactorData: clearTwoFactorDataFuncType = () => dispatch => {
  const clearTwoFactorAction = clearDataActionFactory(LOGIN_TWO_FACTOR);
  dispatch(clearTwoFactorAction.clearData());
};

export const logout: logoutFuncType = () => dispatch => {
  authService.removeToken();
  dispatch(authActions.updateToken());
  dispatch(push(HOME_ROUTE));
};

type LoginFuncType = (
  loginData: { email: string; password: string },
  from: string,
  setSubmitting: any,
  loginUserMethod: any,
  setCount: (val: number) => void,
  setTotal: (val: number) => void
) => (dispatch: Dispatch) => Promise<void>;
type TwoFactorLoginFuncType = (
  code: string,
  type: CODE_TYPE,
  setSubmitting: any,
  loginUserMethod: any,
  setCount: (val: number) => void,
  setTotal: (val: number) => void
) => (dispatch: any, getState: any) => Promise<void>;
type clearLoginDataFuncType = () => (dispatch: Dispatch) => void;
type clearTwoFactorDataFuncType = () => (dispatch: Dispatch) => void;
type logoutFuncType = () => (dispatch: Dispatch) => void;
export type CounterType = { count: number; total: number };

export interface LoginService {
  login: LoginFuncType;
  twoFactorLogin: TwoFactorLoginFuncType;
  clearLoginData: clearLoginDataFuncType;
  clearTwoFactorData: clearTwoFactorDataFuncType;
  logout: logoutFuncType;
}
