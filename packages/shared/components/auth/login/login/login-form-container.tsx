import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import LoginForm, { ILoginFormFormValues } from "./login-form";
import { ROLE } from "shared/constants/constants";
import * as loginService from "../login.service";
import { CounterType, LoginService } from "../login.service";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import { GeeTestDetails, PowDetails } from "gv-api-web";
import Pow from "./captcha/pow";
import { loginUserInvestor, loginUserManager } from "../login.actions";

class _LoginFormContainer extends React.Component<Props, State> {
  state = {
    total: 0,
    count: 0,
    pow: undefined,
    geeTest: undefined,
    id: undefined,
    email: undefined,
    password: undefined
  };
  componentWillUnmount() {
    this.props.service.clearLoginData();
  }
  handlePow = (prefix: number) => {
    const { service, from, role } = this.props;
    const { id, password = "", email = "" } = this.state;
    const method = role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
    service.login_(id!, prefix, { email, password }, from, () => {}, method);
  };
  handleSubmit = (
    loginFormData: ILoginFormFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { service, from, role } = this.props;
    loginService.getCapthca(loginFormData.email).then(res => {
      this.setState({ ...res, ...loginFormData });
    });
    // setSubmitting(true);
    /*const { service, from, role } = this.props;
    const method = role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
    const setCount = (count: number) =>
      setTimeout(() => this.setState(() => ({ count })));
    const setTotal = (total: number) =>
      setTimeout(() => this.setState(() => ({ total })));
    service.login(
      loginFormData,
      from,
      setSubmitting,
      method,
      setCount,
      setTotal
    );*/
  };
  render() {
    const { errorMessage, FORGOT_PASSWORD_ROUTE } = this.props;
    const { count, total, pow, id, email } = this.state;
    return (
      <>
        <LoginForm
          onSubmit={this.handleSubmit}
          error={errorMessage}
          FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
          count={count}
          total={total}
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

interface State extends CounterType {
  pow?: PowDetails;
  geeTest?: GeeTestDetails;
  id?: string;
  email?: string;
  password?: string;
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
  errorMessage: string;
  FORGOT_PASSWORD_ROUTE: string;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginFormContainer);
export default LoginFormContainer;
