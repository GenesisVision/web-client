import "./password-change.scss";

import { ChangePasswordViewModel } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";

import PasswordChangeForm from "./password-change-form";
import { changePassword } from "./service/password-change.service";

interface IPasswordChangeOwnProps {
  service: {
    changePassword(model: ChangePasswordViewModel): Promise<void>;
  };
}

interface IPasswordChangeState {
  errorMessage: string | null;
}

class PasswordChange extends React.Component<
  IPasswordChangeOwnProps,
  IPasswordChangeState
> {
  state = {
    errorMessage: null
  };

  handleSubmit = (model: ChangePasswordViewModel) => {
    this.props.service.changePassword(model).catch((errors: any) => {
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    {
      changePassword
    },
    dispatch
  )
});

const PasswordChangeContainer = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  translate()
)(PasswordChange);

export default PasswordChangeContainer;
