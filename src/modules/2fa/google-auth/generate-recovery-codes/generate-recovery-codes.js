import Dialog from "components/dialog/dialog";
import { GVButton } from "gv-react-components";
import GenerateRecoveryForm from "modules/2fa/google-auth/generate-recovery-codes/generate-recovery-form";
import GoogleAuthCodes from "modules/2fa/google-auth/google-auth-codes";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

class GenerateRecoveryCode extends Component {
  state = {
    isOpenPopup: false,
    isPending: false,
    data: null,
    errorMessage: null
  };
  handleClick = () => {
    this.setState({ isOpenPopup: true });
  };
  handleClose = () => {
    this.setState({ isOpenPopup: false, data: null });
  };
  handleSubmit = values => {
    this.setState({ isPending: true });
    authApiProxy
      .v10Auth2faRecoverycodesNewPost(authService.getAuthArg(), {
        model: values
      })
      .then(data => this.setState({ ...data }))
      .catch(data => this.setState({ ...data }));
  };

  render() {
    if (!this.props.disabled) return null;
    return (
      <div className="generate-recovery-codes">
        <GVButton variant="text" type="button" onClick={this.handleClick}>
          {this.props.t("2fa.codes.generate-recovery-codes")}
        </GVButton>
        <Dialog open={this.state.isOpenPopup} onClose={this.handleClose}>
          {this.state.data ? (
            <GoogleAuthCodes codes={this.state.data.codes} />
          ) : (
            <GenerateRecoveryForm
              onSubmit={this.handleSubmit}
              disabled={this.state.isPending}
              errorMessage={this.state.errorMessage}
            />
          )}
        </Dialog>
      </div>
    );
  }
}

GenerateRecoveryCode.propTypes = {
  disabled: PropTypes.bool
};

export default translate()(GenerateRecoveryCode);
