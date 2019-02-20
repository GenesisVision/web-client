import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";

import { detachToSignal } from "./services/program-unfollow.service";
import UnfollowPopupForm from "./unfollow-popup/unfollow-popup-form";

class ProgramUnfollowContainer extends Component {
  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ errorMessage: "" });
    onClose();
  };
  handleSubmit = () => {
    const { service, onApply, id } = this.props;
    service.detachToSignal(id, onApply);
    this.handleClose();
  };

  render() {
    const { open, onClose, onApply } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose} className="dialog--wider">
        <UnfollowPopupForm
          onSubmit={this.handleSubmit}
          onCancel={onClose}
          onApply={onApply}
        />
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ detachToSignal }, dispatch)
});

export default connect(mapDispatchToProps)(ProgramUnfollowContainer);
