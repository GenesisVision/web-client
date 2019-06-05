import { replace } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import * as authService from "../auth.service";
import { CaptchasType } from "../auth.service";
import Pow from "../captcha/pow";
import {
  CODE_TYPE,
  loginUserInvestor,
  loginUserManager
} from "./login.actions";
import * as loginService from "./login.service";
import {
  LoginFuncType,
  LoginService,
  clearLoginDataFuncType
} from "./login.service";
import { ILoginFormFormValues } from "./login/login-form";
import { IRecoveryCodeFormValues } from "./recovery/recovery-code-form";
import { ITwoFactorCodeFormValues } from "./two-factor/two-factor-code-form";

class _CaptchaContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    prefix: undefined,
    setSubmitting: undefined,
    isSubmit: false,
    captchaType: "None",
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
    const { isSubmit, prefix, captchaType } = this.state;
    const { role, from, service, type } = this.props;
    const method = role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
    if (isSubmit) {
      switch (captchaType) {
        case "Pow":
          if (prefix) {
            service.login({
              ...this.state,
              from,
              method,
              type
            });
            this.setState({
              pow: undefined,
              prefix: undefined,
              isSubmit: false
            });
          }
          break;
        default:
          service.login({
            ...this.state,
            from,
            method,
            type
          });
          this.setState({ isSubmit: false });
          break;
      }
    }
  }
  handlePow = (prefix: number) => {
    this.setState({ prefix });
  };
  handleSubmit = (
    loginFormData: { [keys: string]: any },
    setSubmitting: SetSubmittingType
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
    const { errorMessage, renderForm } = this.props;
    const { pow } = this.state;
    const email = this.state.email || this.props.email;
    return (
      <>
        {renderForm(this.handleSubmit, errorMessage)}
        {pow && <Pow {...pow} login={email} handleSuccess={this.handlePow} />}
      </>
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
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
  isSubmit: boolean;
  captchaType: string;
  setSubmitting?: SetSubmittingType;
  id?: string;
  prefix?: number;
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
  renderForm: (
    handle: (
      loginFormData:
        | ILoginFormFormValues
        | IRecoveryCodeFormValues
        | ITwoFactorCodeFormValues,
      setSubmitting: SetSubmittingType
    ) => void,
    errorMessage: string
  ) => JSX.Element;
  from?: string;
  type?: CODE_TYPE;
}

interface Props extends OwnProps, StateProps, DispatchProps, WithRoleProps {}

const CaptchaContainer = compose<React.ComponentType<OwnProps>>(
  withRole,
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_CaptchaContainer);
export default CaptchaContainer;
