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
  isPending: boolean;
  errorMessage: string | null;
}

class PasswordChange extends React.Component<
  IPasswordChangeOwnProps,
  IPasswordChangeState
> {
  state = {
    isPending: false,
    errorMessage: null
  };

  handleSubmit = (model: ChangePasswordViewModel) => {
    this.setState({ isPending: true });
    this.props.service
      .changePassword(model)
      .then(() => {
        this.setState({ isPending: false });
      })
      .catch((errors: any) => {
        this.setState({ isPending: false, errorMessage: errors.errorMessage });
      });
  };

  render() {
    return (
      <PasswordChangeForm
        onSubmit={this.handleSubmit}
        isPending={this.state.isPending}
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
