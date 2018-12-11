import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { closeFund } from "shared/components/funds/fund-details/services/fund-details.service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import CloseFundForm from "./close-fund-form";

class CloseFundContainer extends Component {
  state = { errorMessage: "" };
  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ errorMessage: "" });
    onClose();
  };
  handleSubmit = (data, setSubmitting) => {
    const { service, onApply, id } = this.props;
    let opts = {};
    if (data.twoFactorCode) {
      opts.twoFactorCode = data.twoFactorCode;
    }
    service
      .closeFund(id, opts)
      .then(() => {
        this.handleClose();
        service.alertSuccess();
        onApply();
      })
      .catch(e => {
        this.setState({ errorMessage: e.errorMessage });
        setSubmitting(false);
      });
  };

  render() {
    const { open, twoFactorEnabled, onClose } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose} className="dialog--wider">
        <CloseFundForm
          onSubmit={this.handleSubmit}
          onCancel={onClose}
          twoFactorEnabled={twoFactorEnabled}
          errorMessage={errorMessage}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  if (!state.accountSettings) return;
  const { twoFactorEnabled } = state.accountSettings.twoFactorAuth.data;
  return { twoFactorEnabled };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      closeFund,
      alertSuccess: () =>
        alertMessageActions.success(
          "program-details-page.description.close-program-notification-success",
          true
        )
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseFundContainer);
