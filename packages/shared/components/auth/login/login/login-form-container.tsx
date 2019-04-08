import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import LoginForm, { ILoginFormFormValues } from "./login-form";
import { ROLE } from "shared/constants/constants";
import * as loginService from "../login.service";
import { LoginService, SetSubmittingFuncType } from "../login.service";
import * as authService from "../../auth.service";
import { CaptchasType } from "../../auth.service";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import Pow from "../../captcha/pow";
import { loginUserInvestor, loginUserManager } from "../login.actions";

class _LoginFormContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    isSubmit: undefined,
    prefix: undefined,
    id: "",
    email: "",
    password: "",
    setSubmitting: (val: boolean) => {}
  };
  componentWillUnmount() {
    this.props.service.clearLoginData();
  }
  componentDidUpdate(): void {
    const { isSubmit, pow, prefix } = this.state;
    const { service, from, role } = this.props;
    if (isSubmit) {
      if (pow && prefix) {
        const method =
          role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
        // service.login({ ...this.state, prefix, from, method });
        this.setState({ pow: undefined });
      }
    }
  }
  handlePow = (prefix: number) => {
    this.setState({ prefix });
  };
  handleSubmit = (
    loginFormData: ILoginFormFormValues,
    setSubmitting: SetSubmittingFuncType
  ) => {
    authService.getCaptcha(loginFormData.email).then(res => {
      this.setState({
        ...res,
        ...loginFormData,
        setSubmitting,
        isSubmit: true
      });
    });
  };
  render() {
    const { errorMessage, FORGOT_PASSWORD_ROUTE } = this.props;
    const { pow, id, email } = this.state;
    return (
      <>
        <LoginForm
          onSubmit={this.handleSubmit}
          error={errorMessage}
          FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
        />
        {pow && (
          <Pow {...pow} id={id} email={email} handleSuccess={this.handlePow} />
        )}
      </>
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

interface State extends ILoginFormFormValues, CaptchasType {
  setSubmitting: SetSubmittingFuncType;
  id?: string;
  prefix?: number;
  isSubmit?: boolean;
}

interface StateProps {
  isAuthenticated: boolean;
  errorMessage: string;
}

interface DispatchProps {
  service: LoginService;
}

interface OwnProps {
  from: string;
  role: ROLE;
  FORGOT_PASSWORD_ROUTE: string;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginFormContainer);
export default LoginFormContainer;
