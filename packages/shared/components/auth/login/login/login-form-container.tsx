import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import LoginForm, { ILoginFormFormValues } from "./login-form";
import { loginUserInvestor, loginUserManager } from "../login.actions";
import { ROLE } from "shared/constants/constants";
import { LoginService } from "../login.service";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import * as loginService from "../login.service";

class LoginFormContainer extends React.PureComponent<Props> {
  componentWillUnmount() {
    this.props.service.clearLoginData();
  }
  handleSubmit = (
    loginFormData: ILoginFormFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { service, from, role } = this.props;
    const method = role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
    service.login(loginFormData, from, setSubmitting, method);
  };
  render() {
    const { errorMessage, FORGOT_PASSWORD_ROUTE } = this.props;
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        error={errorMessage}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
      />
    );
  }
}

const mapStateToProps = (
  state: ManagerRootState | InvestorRootState
): StateProps => {
  const { errorMessage } = state.loginData.login;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, errorMessage };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators({ ...(loginService as LoginService) }, dispatch)
});

interface StateProps {
  isAuthenticated: boolean;
  errorMessage: string;
}

interface DispatchProps {
  service: LoginService;
}

interface OwnProps {
  loginService: LoginService;
  from: string;
  role: ROLE;
  errorMessage: string;
  FORGOT_PASSWORD_ROUTE: string;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
