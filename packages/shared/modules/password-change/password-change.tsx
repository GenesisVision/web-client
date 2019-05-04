import "./password-change.scss";

import { ChangePasswordViewModel } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { MiddlewareDispatch, ResponseError } from "shared/utils/types";

import PasswordChangeForm from "./password-change-form";
import { changePassword } from "./service/password-change.service";

class PasswordChange extends React.Component<Props, State> {
  state = {
    errorMessage: undefined
  };

  handleSubmit = (model: ChangePasswordViewModel) => {
    this.props.service.changePassword(model).catch((errors: ResponseError) => {
      this.setState({ errorMessage: errors.errorMessage });
    });
  };

  render() {
    return (
      <PasswordChangeForm
        onSubmit={this.handleSubmit}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    changePassword: (model: ChangePasswordViewModel) =>
      dispatch(changePassword(model))
  }
});

interface Props extends DispatchProps {}

interface DispatchProps {
  service: {
    changePassword(model: ChangePasswordViewModel): Promise<void>;
  };
}

interface State {
  errorMessage?: string;
}

const PasswordChangeContainer = compose<React.ComponentType>(
  connect(
    null,
    mapDispatchToProps
  ),
  translate()
)(PasswordChange);
export default PasswordChangeContainer;
