import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProgramUnfollow from "./program-unfollow";
import { detachToSignal } from "./services/program-unfollow.service";

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
    const { open } = this.props;
    return (
      <ProgramUnfollow
        open={open}
        onApply={this.handleSubmit}
        onCancel={this.handleClose}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ detachToSignal }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ProgramUnfollowContainer);
