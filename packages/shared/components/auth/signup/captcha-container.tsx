import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "shared/utils/types";

import * as authService from "../auth.service";
import { CaptchasType } from "../auth.service";
import Pow from "../captcha/pow";
import { RegisterViewModel } from "./actions/signup.actions";
import { signUp } from "./services/signup.service";

class _CaptchaContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    prefix: undefined,
    setSubmitting: undefined,
    isSubmit: false,
    captchaType: "None",
    userName: "",
    refCode: "",
    isAuto: false,
    email: "",
    password: "",
    confirmPassword: "",
    code: ""
  };

  componentDidUpdate(): void {
    const { isSubmit, prefix, captchaType } = this.state;
    const { service } = this.props;
    if (isSubmit) {
      switch (captchaType) {
        case "Pow":
          if (prefix) {
            service.signUp({
              ...this.state
            });
            this.setState({
              pow: undefined,
              prefix: undefined,
              isSubmit: false
            });
          }
          break;
        default:
          service.signUp({
            ...this.state
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
    signUpFormData: { [keys: string]: any },
    setSubmitting: SetSubmittingType
  ) => {
    const email = signUpFormData.email;
    authService.getCaptcha(email).then(res => {
      this.setState({
        ...res,
        ...signUpFormData,
        email,
        setSubmitting,
        isSubmit: true
      });
    });
  };
  render() {
    const { errorMessage, renderForm } = this.props;
    const { pow } = this.state;
    const email = this.state.email;
    return (
      <>
        {renderForm(this.handleSubmit, errorMessage)}
        {pow && <Pow {...pow} login={email} handleSuccess={this.handlePow} />}
      </>
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { signUpData } = state;
  const { errorMessage } = signUpData;
  return { errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    signUp: (signUpData: any) => dispatch(signUp(signUpData))
  }
});

interface State extends CaptchasType {
  isSubmit: boolean;
  captchaType: string;
  setSubmitting?: SetSubmittingType;
  prefix?: number;
  userName?: string;
  code?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  service: {
    signUp(signUpData: any): void;
  };
}

interface OwnProps {
  renderForm: (
    handle: (
      signUpFormData: RegisterViewModel,
      setSubmitting: SetSubmittingType
    ) => void,
    errorMessage: string
  ) => JSX.Element;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const CaptchaContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_CaptchaContainer);
export default CaptchaContainer;
