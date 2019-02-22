import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";

import MakeSignalForm, {
  IMakeSignalFormValues
} from "./components/program-make-signal-form";
import { programMakeSignal } from "./services/program-make-signal.service";

interface IProgramMakeSignalContainerOwnProps extends IDialogProps {
  id: string;
  programName: string;
  onApply(): void;
}

interface IProgramMakeSignalContainerProps
  extends IProgramMakeSignalContainerOwnProps {
  service: {
    programMakeSignal(
      id: string,
      successFee: number,
      subscriptionFee: number
    ): Promise<void>;
  };
}

interface IProgramMakeSignalContainerState {
  errorMessage: string;
}

class ProgramMakeSignalContainer extends Component<
  IProgramMakeSignalContainerProps,
  IProgramMakeSignalContainerState
> {
  state = {
    errorMessage: ""
  };

  handleApply = (
    values: IMakeSignalFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { id, service, onClose } = this.props;

    service
      .programMakeSignal(id, +values.successFee, +values.subscriptionFee)
      .then(() => {
        onClose();
      })
      .catch((error: any) => {
        setSubmitting(false);
        this.setState({ errorMessage: error.errorMessage });
      });
  };

  handleClose = () => {
    this.setState({ errorMessage: "" });
    this.props.onClose();
  };

  render() {
    const { open, programName } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <MakeSignalForm
          programName={programName}
          errorMessage={errorMessage}
          onSubmit={this.handleApply}
        />
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    {
      programMakeSignal
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(ProgramMakeSignalContainer);
