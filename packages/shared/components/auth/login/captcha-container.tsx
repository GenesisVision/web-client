import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { ROLE } from "shared/constants/constants";
import * as loginService from "./login.service";
import {
  clearLoginDataFuncType,
  LoginFuncType,
  LoginService,
  SetSubmittingFuncType
} from "./login.service";
import * as authService from "../auth.service";
import { CaptchasType } from "../auth.service";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import Pow from "../captcha/pow";
import { replace } from "connected-react-router";
import { NOT_FOUND_PAGE_ROUTE } from "../../not-found/not-found.routes";
import { ILoginFormFormValues } from "./login/login-form";
import {
  CODE_TYPE,
  loginUserInvestor,
  loginUserManager
} from "./login.actions";

class _LoginContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    isSubmit: undefined,
    prefix: undefined,
    setSubmitting: undefined,
    id: "",
    email: "",
    password: "",
    code: ""
  };
  componentDidMount() {
    const { email, password, service, type } = this.props;
    if (type !== undefined && (email === "" || password === "")) {
      service.showNotFoundPage();
    }
  }
  componentWillUnmount() {
    this.props.service.clearLoginData();
  }
  componentDidUpdate(): void {
    const { isSubmit, pow, prefix } = this.state;
    const { from, role, service, type } = this.props;
    const method = role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
    if (isSubmit) {
      if (pow && prefix) {
        this.setState({ pow: undefined });
      }
      service.login({
        ...this.state,
        from,
        method,
        type
      });
      this.setState({ isSubmit: false });
    }
  }
  handlePow = (prefix: number) => {
    this.setState({ prefix });
  };
  handleSubmit = (
    loginFormData: { [keys: string]: any },
    setSubmitting: SetSubmittingFuncType
  ) => {
    const email = loginFormData.email || this.props.email;
    authService.getCaptcha(email).then(res => {
      this.setState({
        ...res,
        ...loginFormData,
        email,
        setSubmitting,
        isSubmit: true
      });
    });
  };
  render() {
    const { errorMessage, FORGOT_PASSWORD_ROUTE, renderForm } = this.props;
    const { pow, id } = this.state;
    const email = this.state.email || this.props.email;
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
  setSubmitting?: SetSubmittingFuncType;
  id?: string;
  prefix?: number;
  isSubmit?: boolean;
  code?: string;
  email?: string;
  password?: string;
}

interface StateProps extends ILoginFormFormValues {
  isAuthenticated: boolean;
  errorMessage: string;
}

interface DispatchProps {
  service: {
    clearLoginData: clearLoginDataFuncType;
    login: LoginFuncType;
    showNotFoundPage: () => void;
  };
}

interface OwnProps {
  role: ROLE;
  FORGOT_PASSWORD_ROUTE?: string;
  renderForm: (
    handle: (
      loginFormData: Object,
      setSubmitting: SetSubmittingFuncType
    ) => void,
    errorMessage: string,
    FORGOT_PASSWORD_ROUTE?: string
  ) => JSX.Element;
  from?: string;
  type?: CODE_TYPE;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const CaptchaContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  ManagerRootState | InvestorRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_LoginContainer);
export default CaptchaContainer;
