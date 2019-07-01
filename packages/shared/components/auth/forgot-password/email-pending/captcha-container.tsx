import { CaptchaCheckResult } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AuthRootState, MiddlewareDispatch } from "shared/utils/types";

import * as authService from "../../auth.service";
import { CaptchasType } from "../../auth.service";
import Pow from "../../captcha/pow";
import { sendForgotPasswordEmail } from "../services/forgot-password.service";

class _CaptchaContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    prefix: undefined,
    isSubmit: false,
    captchaType: "None",
    id: "",
    email: ""
  };

  componentDidUpdate(): void {
    const { isSubmit, prefix = "", id, captchaType } = this.state;
    const { service } = this.props;
    const captchaCheckResult = {
      id,
      pow: {
        prefix
      },
      geeTest: {}
    };
    const sendRequest = () =>
      service.sendForgotPasswordEmail(captchaCheckResult);
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

  handleSubmit = () => {
    authService.getCaptcha(this.props.email).then(res => {
      console.log(res);
      this.setState({
        ...res,
        email: this.props.email,
        isSubmit: true
      });
    });
  };

  render() {
    const { renderForm } = this.props;
    const { pow, email } = this.state;
    return (
      <>
        {renderForm(this.handleSubmit)}
        {pow && <Pow {...pow} login={email} handleSuccess={this.handlePow} />}
      </>
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { email } = state.emailPending;
  return { email };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    sendForgotPasswordEmail: (captchaCheckResult: CaptchaCheckResult) => {
      dispatch(sendForgotPasswordEmail(captchaCheckResult));
    }
  }
});

interface State extends CaptchasType {
  isSubmit: boolean;
  captchaType: string;
  id?: string;
  prefix?: number;
  email?: string;
}

interface StateProps {
  email: string;
}

interface DispatchProps {
  service: {
    sendForgotPasswordEmail: (captchaCheckResult: CaptchaCheckResult) => void;
  };
}

interface OwnProps {
  renderForm: (handle: () => void) => JSX.Element;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const CaptchaContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_CaptchaContainer);
export default CaptchaContainer;
