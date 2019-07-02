import { replace } from "connected-react-router";
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
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { AuthRootState } from "shared/utils/types";

import CaptchaContainer from "../../captcha-container";
import {
  CODE_TYPE,
  loginUserInvestorAction,
  loginUserManagerAction
} from "../signin.actions";
import { clearLoginData, login_ } from "../signin.service";
import TwoFactorCodeForm from "./two-factor-code-form";

const _TwoFactorPage: React.FC<Props> = ({
  password,
  email,
  location,
  service,
  errorMessage,
  role
}) => {
  const from = (location.state && location.state.pathname) || HOME_ROUTE;
  const method =
    role === ROLE.MANAGER ? loginUserManagerAction : loginUserInvestorAction;
  useEffect(() => service.clearLoginData, []);
  useEffect(() => {
    if (email === "" || password === "") service.showNotFoundPage();
  }, []);
  return (
    <div className="login-two-factor-page">
      <CaptchaContainer
        request={service.login_(method, from, CODE_TYPE.TWO_FACTOR)}
        renderForm={handle => (
          <TwoFactorCodeForm
            onSubmit={handle}
            error={errorMessage}
            email={email}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return {
    password,
    email,
    errorMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE)),
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
  showNotFoundPage: () => void;
  clearLoginData: typeof clearLoginData;
  login_: typeof login_;
}

interface StateProps {
  errorMessage: string;
  email: string;
  password: string;
}

interface OwnProps {
  location: LocationState;
}

interface Props extends OwnProps, StateProps, DispatchProps, WithRoleProps {}

const TwoFactorPage = compose<React.ComponentType<OwnProps>>(
  withRole,
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_TwoFactorPage);
export default TwoFactorPage;
