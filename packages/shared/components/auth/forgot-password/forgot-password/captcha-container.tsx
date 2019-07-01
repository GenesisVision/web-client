import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "shared/utils/types";

import * as authService from "../../auth.service";
import { CaptchasType } from "../../auth.service";
import Pow from "../../captcha/pow";
import { forgotPassword } from "../services/forgot-password.service";
import { ForgotPasswordViewModel } from "gv-api-web";

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
    /*const { email, password, service, type } = this.props;
    if (type !== undefined && (email === "" || password === "")) {
      service.showNotFoundPage();
    }*/
  }
  componentWillUnmount() {
    // this.props.service.clearLoginData();
  }
  componentDidUpdate(): void {
    const {
      isSubmit,
      prefix,
      captchaType,
      email,
      id,
      setSubmitting
    } = this.state;
    const { service } = this.props;
    if (isSubmit) {
      switch (captchaType) {
        case "Pow":
        default:
          if (prefix) {
            service.forgotPassword(
              {
                email,
                captchaCheckResult: {
                  id,
                  pow: {
                    prefix
                  },
                  geeTest: {}
                }
              },
              setSubmitting!
            );
            this.setState({
              pow: undefined,
              prefix: undefined,
              isSubmit: false
            });
          }
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
    authService.getCaptcha(values.email).then(res => {
      this.setState({
        ...res,
        ...values,
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
  const { isPending, errorMessage } = state.passwordRestoreData.forgot;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    forgotPassword: (formData, setSubmitting) => {
      dispatch(forgotPassword(formData)).catch(() => {
        setSubmitting(false);
      });
    }
  }
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

interface StateProps {
  isPending: boolean;
  errorMessage: string;
}

interface DispatchProps {
  service: {
    forgotPassword: (
      formData: ForgotPasswordViewModel,
      setSubmitting: SetSubmittingType
    ) => void;
  };
}

interface OwnProps {
  renderForm: (
    handle: (loginFormData: any, setSubmitting: SetSubmittingType) => void,
    errorMessage: string
  ) => JSX.Element;
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
