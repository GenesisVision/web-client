import "shared/components/auth/login/login/login.scss";

import { replace } from "connected-react-router";
import { LocationState } from "history";
import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import LoginForm, {
  ILoginFormFormValues
} from "shared/components/auth/login/login/login-form";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

import { ROLE } from "../../../../constants/constants";
import withRole, { WithRoleProps } from "../../../../decorators/with-role";
import { isAuthenticatedSelector } from "../../../../reducers/auth-reducer";
import { AuthRootState } from "../../../../utils/types";
import { NOT_FOUND_PAGE_ROUTE } from "../../../not-found/not-found.routes";
import {
  loginUserInvestorAction,
  loginUserManagerAction
} from "../login.actions";
import {
  LoginFuncType,
  LoginFuncType_,
  LoginService,
  clearLoginDataFuncType
} from "../login.service";
import * as loginService from "../login.service";
import CaptchaContainer from "./captcha-container";

const _LoginPage: React.FC<Props> = ({
  location,
  service,
  errorMessage,
  role
}) => {
  const from = (location.state && location.state.pathname) || HOME_ROUTE;
  const method =
    role === ROLE.MANAGER ? loginUserManagerAction : loginUserInvestorAction;
  useEffect(() => service.clearLoginData, []);
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} />
      <CaptchaContainer
        request={service.login_(method, from)}
        renderForm={handle => (
          <LoginForm onSubmit={handle} error={errorMessage} />
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    errorMessage,
    email,
    password
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      ...(loginService as LoginService),
      showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE))
    },
    dispatch
  )
});

interface DispatchProps {
  service: {
    clearLoginData: clearLoginDataFuncType;
    login_: LoginFuncType_;
    showNotFoundPage: () => void;
  };
}

interface StateProps extends ILoginFormFormValues {
  isAuthenticated: boolean;
  errorMessage: string;
}

interface OwnProps {
  location: LocationState;
}

interface Props extends OwnProps, StateProps, DispatchProps, WithRoleProps {}

const LoginPage = compose<React.ComponentType<OwnProps>>(
  withRole,
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_LoginPage);
export default LoginPage;
