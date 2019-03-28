import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { closeProgram } from "shared/components/programs/program-details/services/program-details.service";

import CloseProgramForm from "./close-program-form";

class CloseProgramContainer extends Component {
  state = { errorMessage: "" };
  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ errorMessage: "" });
    onClose();
  };
  handleSubmit = data => {
    const { service, onApply, id, onClose } = this.props;
    let opts = {};
    if (data.twoFactorCode) {
      opts.twoFactorCode = data.twoFactorCode;
    }
    service.closeProgram(onApply, id, opts);
    onClose();
  };

  render() {
    const { open, twoFactorEnabled, onClose } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose} className="dialog--wider">
        <CloseProgramForm
          onSubmit={this.handleSubmit}
          onCancel={onClose}
          twoFactorEnabled={twoFactorEnabled}
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

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      {
        closeProgram
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseProgramContainer);
