import { CaptchaDetailsCaptchaTypeEnum } from "gv-api-web";
import * as React from "react";
import { SetSubmittingType } from "shared/utils/types";

import * as authService from "./auth.service";
import { CaptchasType } from "./auth.service";
import Pow from "./captcha/pow";

class CaptchaContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    prefix: undefined,
    setSubmitting: undefined,
    isSubmit: false,
    captchaType: "None" as CaptchaDetailsCaptchaTypeEnum,
    id: "",
    email: "",
    values: undefined
  };

  componentDidUpdate(): void {
    const { request } = this.props;
    const {
      isSubmit,
      prefix = "",
      id,
      setSubmitting,
      captchaType,
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
        setSubmitting!
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

  handleSubmit = (values: TValues, setSubmitting?: SetSubmittingType) => {
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

export type TValues = any;

interface State extends CaptchasType {
  isSubmit: boolean;
  captchaType: CaptchaDetailsCaptchaTypeEnum;
  setSubmitting?: SetSubmittingType;
  id?: string;
  prefix?: number;
  email?: string;
  values?: TValues;
}

interface OwnProps {
  request: (values: TValues, setSubmitting: SetSubmittingType) => void;
  renderForm: (
    handle: (values: TValues, setSubmitting?: SetSubmittingType) => void
  ) => JSX.Element;
}

interface Props extends OwnProps {}

export default CaptchaContainer;
