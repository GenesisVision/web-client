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
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { ILoginFormFormValues } from "./login/login-form";
import {
  CODE_TYPE,
  loginUserInvestor,
  loginUserManager
} from "./login.actions";
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
    const { from, service, type } = this.props;
    const role = process.env.REACT_APP_PLATFORM;
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
            this.setState({ pow: undefined, isSubmit: false });
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
  isSubmit: boolean;
  captchaType: string;
  setSubmitting?: SetSubmittingFuncType;
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
      setSubmitting: SetSubmittingFuncType
    ) => void,
    errorMessage: string
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
)(_CaptchaContainer);
export default CaptchaContainer;
