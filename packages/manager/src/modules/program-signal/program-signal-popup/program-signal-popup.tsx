import { ProgramDetailsFull } from "gv-api-web";
import React, { Component } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import { IProgramSignalFormValues } from "./components/program-signal-form";
import ProgramSignalForm from "./components/program-signal-form";

class _ProgramSignalPopup extends Component<Props> {
  state = {
    errorMessage: ""
  };

  handleApply = (
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { programDescription, serviceMethod, onClose, onApply } = this.props;

    serviceMethod(programDescription.id, values.successFee!, values.volumeFee!)
      .then(() => {
        onClose();
        onApply();
      })
      .catch((error: ResponseError) => {
        setSubmitting(false);
        this.setState({ errorMessage: error.errorMessage });
      });
  };

  handleClose = () => {
    this.setState({ errorMessage: "" });
    this.props.onClose();
  };

  render() {
    const { programDescription, open, header } = this.props;
    const signalSuccessFee = programDescription.isSignalProgram
      ? programDescription.signalSuccessFee
      : undefined;
    const signalVolumeFee = programDescription.isSignalProgram
      ? programDescription.signalVolumeFee
      : undefined;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <ProgramSignalForm
          errorMessage={errorMessage}
          onSubmit={this.handleApply}
          header={header}
          programName={programDescription.title}
          signalSuccessFee={signalSuccessFee}
          signalVolumeFee={signalVolumeFee}
        />
      </Dialog>
    );
  }
}

const ProgramSignalPopup = React.memo(_ProgramSignalPopup);
export default ProgramSignalPopup;

interface Props extends OwnProps, IDialogProps {}

interface OwnProps {
  programDescription: ProgramDetailsFull;
  header: string;
  onApply(): void;
  serviceMethod(
    id: string,
    successFee: number,
    volumeFee: number
  ): Promise<void>;
}
