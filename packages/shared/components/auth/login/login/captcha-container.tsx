import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import * as authService from "../../auth.service";
import { CaptchasType } from "../../auth.service";
import Pow from "../../captcha/pow";
import {
  CODE_TYPE,
  loginUserInvestorAction,
  loginUserManagerAction
} from "../login.actions";
import { ILoginFormFormValues } from "../login/login-form";
import { IRecoveryCodeFormValues } from "../recovery/recovery-code-form";
import { ITwoFactorCodeFormValues } from "../two-factor/two-factor-code-form";

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

  componentDidUpdate(): void {
    const { isSubmit, prefix, captchaType } = this.state;
    const { role, from, type, request } = this.props;
    const method =
      role === ROLE.MANAGER ? loginUserManagerAction : loginUserInvestorAction;
    const sendRequest = () =>
      request({
        ...this.state,
        from,
        method,
        type
      });
    if (isSubmit) {
      switch (captchaType) {
        case "Pow":
          if (prefix) {
            sendRequest();
            this.setState({
              pow: undefined,
              prefix: undefined,
              isSubmit: false
            });
          }
          break;
        default:
          sendRequest();
          this.setState({ isSubmit: false });
          break;
      }
    }
  }
  handlePow = (prefix: number) => {
    this.setState({ prefix });
  };
  handleSubmit = (
    values: { [keys: string]: any },
    setSubmitting: SetSubmittingType
  ) => {
    const email = values.email || this.props.email;
    authService.getCaptcha(email).then(res => {
      this.setState({
        ...res,
        ...values,
        email,
        setSubmitting,
        isSubmit: true
      });
    });
  };
  render() {
    const { renderForm } = this.props;
    const { pow } = this.state;
    const email = this.state.email || this.props.email;
    return (
      <>
        {renderForm(this.handleSubmit)}
        {pow && <Pow {...pow} login={email} handleSuccess={this.handlePow} />}
      </>
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { email, password } = state.loginData.twoFactor;
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    email,
    password
  };
};

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
}

type TValues = any; //{ [keys: string]: any };
interface OwnProps {
  request: (values: TValues, setSubmitting?: SetSubmittingType) => void;
  renderForm: (
    handle: (
      loginFormData:
        | ILoginFormFormValues
        | IRecoveryCodeFormValues
        | ITwoFactorCodeFormValues,
      setSubmitting: SetSubmittingType
    ) => void
  ) => JSX.Element;
  from?: string;
  type?: CODE_TYPE;
}

interface Props extends OwnProps, StateProps, WithRoleProps {}

const CaptchaContainer = compose<React.ComponentType<OwnProps>>(
  withRole,
  connect<StateProps, null, OwnProps, AuthRootState>(mapStateToProps)
)(_CaptchaContainer);
export default CaptchaContainer;
