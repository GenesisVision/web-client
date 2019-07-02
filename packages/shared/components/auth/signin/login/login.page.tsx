import "./login.scss";

import { LocationState } from "history";
import * as React from "react";
import { useEffect } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { HOME_ROUTE, LOGIN_ROUTE } from "shared/routes/app.routes";
import { AuthRootState } from "shared/utils/types";

import CaptchaContainer from "../../captcha-container";
import {
  loginUserInvestorAction,
  loginUserManagerAction
} from "../signin.actions";
import { clearLoginData, login_ } from "../signin.service";
import LoginForm from "./login-form";

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
  return {
    errorMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      clearLoginData,
      login_
    },
    dispatch
  )
});

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  clearLoginData: typeof clearLoginData;
  login_: typeof login_;
}

interface StateProps {
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
