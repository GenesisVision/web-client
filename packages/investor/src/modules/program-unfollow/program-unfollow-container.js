import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import UnfollowPopupForm from "./unfollow-popup-form";

class ProgramUnfollowContainer extends Component {
  state = { errorMessage: "" };
  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ errorMessage: "" });
    onClose();
  };
  handleSubmit = (data, setSubmitting) => {
    const { onApply } = this.props;
    onApply();
    // const { service, onApply, id } = this.props;
    // let opts = {};
    // service
    //   .closeProgram(id, opts)
    //   .then(() => {
    //     this.handleClose();
    //     service.alertSuccess();
    //     onApply();
    //   })
    //   .catch(e => {
    //     this.setState({ errorMessage: e.errorMessage });
    //     setSubmitting(false);
    //   });
  };

  render() {
    const { open, onClose, onApply } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose} className="dialog--wider">
        <UnfollowPopupForm
          onSubmit={this.handleSubmit}
          onCancel={onClose}
          onApply={onApply}
          errorMessage={errorMessage}
        />
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // service: bindActionCreators(
  //   {
  //     closeProgram,
  //     alertSuccess: () =>
  //       alertMessageActions.success(
  //         "program-details-page.description.close-program-notification-success",
  //         true
  //       )
  //   },
  //   dispatch
  // )
});

export default connect(mapDispatchToProps)(ProgramUnfollowContainer);
