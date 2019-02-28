import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import ProgramUnfollow from "./program-unfollow";
import { detachToSignal } from "./services/program-unfollow.service";

export interface ITProgramUnfollowContainerProps {
  service: any;
  id: string;
  open: boolean;
  onClose(): void;
  onApply(): void;
}

class ProgramUnfollowContainer extends React.Component<
  ITProgramUnfollowContainerProps
> {
  handleClose = () => {
    const { onClose } = this.props;
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
        onClose={this.handleClose}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators({ detachToSignal }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ProgramUnfollowContainer);
