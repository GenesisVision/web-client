import { ProgramDetailsFull } from "gv-api-web";
import React, { Component, ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import ProgramSignalForm, {
  IProgramSignalFormValues
} from "../program-make-signal/components/program-signal-form";
import { programEditSignal } from "./services/program-edit-signal.service";

class _ProgramEditSignalContainer extends Component<Props, State> {
  state = {
    errorMessage: ""
  };

  handleApply = (
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { programDescription, service, onClose, onApply } = this.props;

    service
      .programEditSignal(
        programDescription.id,
        values.successFee!,
        values.volumeFee!
      )
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
    const { t, open, programDescription } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <ProgramSignalForm
          header={t(
            "program-details-page.description.edit-signal-provider.title"
          )}
          programName={programDescription.title}
          signalSuccessFee={programDescription.signalSuccessFee}
          signalVolumeFee={programDescription.signalVolumeFee}
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
      programEditSignal
    },
    dispatch
  )
});

const ProgramEditSignalContainer = compose<ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_ProgramEditSignalContainer);

export default ProgramEditSignalContainer;

interface OwnProps extends IDialogProps {
  programDescription: ProgramDetailsFull;
  onApply(): void;
}

interface Props extends OwnProps, InjectedTranslateProps {
  service: {
    programEditSignal(
      id: string,
      successFee: number,
      volumeFee: number
    ): Promise<void>;
  };
}

interface State {
  errorMessage: string;
}
