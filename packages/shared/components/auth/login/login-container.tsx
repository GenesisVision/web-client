import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { ROLE } from "shared/constants/constants";
import * as loginService from "./login.service";
import { LoginService, SetSubmittingFuncType } from "./login.service";
import * as authService from "../auth.service";
import { CaptchasType } from "../auth.service";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import Pow from "../captcha/pow";
import { replace } from "connected-react-router";
import { NOT_FOUND_PAGE_ROUTE } from "../../not-found/not-found.routes";
import { ILoginFormFormValues } from "./login/login-form";
import { loginUserInvestor, loginUserManager } from "./login.actions";

class _LoginContainer extends React.PureComponent<Props, State> {
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
    const { from, role, request } = this.props;
    if (isSubmit) {
      if (pow && prefix) {
        const method =
          role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
        request({ ...this.state, from, method });
        this.setState({ pow: undefined });
      }
    }
  }
  handlePow = (prefix: number) => {
    this.setState({ prefix });
  };
  handleSubmit = (
    loginFormData: { [keys: string]: any },
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
    const { errorMessage, FORGOT_PASSWORD_ROUTE, renderForm } = this.props;
    const { pow, id, email } = this.state;
    return (
      <>
        {renderForm(this.handleSubmit, errorMessage, FORGOT_PASSWORD_ROUTE)}
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
  const { email, password } = state.loginData.twoFactor;
  return { isAuthenticated, errorMessage, email, password };
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

interface State extends CaptchasType {
  setSubmitting: SetSubmittingFuncType;
  id?: string;
  prefix?: number;
  isSubmit?: boolean;
}

interface StateProps extends ILoginFormFormValues {
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
  request: any;
  renderForm: (
    handle: (
      loginFormData: Object,
      setSubmitting: SetSubmittingFuncType
    ) => void,
    errorMessage: string,
    FORGOT_PASSWORD_ROUTE: string
  ) => JSX.Element;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginContainer);
export default LoginContainer;
