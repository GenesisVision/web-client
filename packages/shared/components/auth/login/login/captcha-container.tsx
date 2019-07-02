import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import * as authService from "../../auth.service";
import { CaptchasType } from "../../auth.service";
import Pow from "../../captcha/pow";
import { CODE_TYPE } from "../login.actions";
import { ILoginFormFormValues } from "../login/login-form";

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
    values: undefined
  };

  componentDidUpdate(): void {
    const { request } = this.props;
    const {
      isSubmit,
      prefix,
      captchaType,
      id,
      setSubmitting,
      values = {}
    } = this.state;
    const captchaCheckResult = {
      id,
      pow: {
        prefix
      },
      geeTest: {}
    };
    const sendRequest = () =>
      request(
        {
          ...values,
          captchaCheckResult
        },
        setSubmitting
      );
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
  handleSubmit = (values: TValues, setSubmitting: SetSubmittingType) => {
    authService.getCaptcha(values.email).then(res => {
      this.setState({
        ...res,
        values,
        setSubmitting,
        isSubmit: true,
        email: values.email
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
  return {
    isAuthenticated: isAuthenticatedSelector(state)
  };
};

interface State extends CaptchasType {
  isSubmit: boolean;
  captchaType: string;
  setSubmitting?: SetSubmittingType;
  id?: string;
  prefix?: number;
  email?: string;
  values?: any;
}

interface StateProps {
  isAuthenticated: boolean;
}

type TValues = any; //{ [keys: string]: any };
interface OwnProps {
  request: (values: TValues, setSubmitting?: SetSubmittingType) => void;
  renderForm: (
    handle: (
      loginFormData: ILoginFormFormValues,
      setSubmitting: SetSubmittingType
    ) => void
  ) => JSX.Element;
  type?: CODE_TYPE;
}

interface Props extends OwnProps, StateProps {}

const CaptchaContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, null, OwnProps, AuthRootState>(mapStateToProps)
)(_CaptchaContainer);
export default CaptchaContainer;
