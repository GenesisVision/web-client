import React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";

import ProgramUnfollowForm, {
  IProgramUnfollowFormValues
} from "./components/program-unfollow-form";
import { detachToSignal } from "./services/program-unfollow.service";

class ProgramUnfollowContainer extends React.PureComponent<Props> {
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };
  handleSubmit = (value: IProgramUnfollowFormValues) => {
    const { service, onApply, id } = this.props;
    const model = { mode: value.mode };
    service.detachToSignal(id, onApply, model);
    this.handleClose();
  };

  render() {
    const { open } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <ProgramUnfollowForm onSubmit={this.handleSubmit} />
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { detachToSignal },
    dispatch
  )
});

export default connect<null, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ProgramUnfollowContainer);

interface ServiceThunks extends ActionCreatorsMapObject {
  detachToSignal: typeof detachToSignal;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  id: string;
  onApply(): void;
}

interface Props extends OwnProps, DispatchProps, IDialogProps {}
