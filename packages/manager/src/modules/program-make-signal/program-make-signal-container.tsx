import React, { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import ProgramSignalForm, {
  IProgramSignalFormValues
} from "./components/program-signal-form";
import { programMakeSignal } from "./services/program-make-signal.service";
import { InjectedTranslateProps, translate } from "react-i18next";

class _ProgramMakeSignalContainer extends Component<Props, State> {
  state = {
    errorMessage: ""
  };

  handleApply = (
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { id, service, onClose, onApply } = this.props;

    service
      .programMakeSignal(id, values.successFee!, values.volumeFee!)
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
    const { t, open, programName } = this.props;
    const { errorMessage } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <ProgramSignalForm
          header={t("program-details-page.description.signal-provider.title")}
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

const ProgramMakeSignalContainer = compose<ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_ProgramMakeSignalContainer);

export default ProgramMakeSignalContainer;

interface OwnProps extends IDialogProps {
  id: string;
  programName: string;
  onApply(): void;
}

interface Props extends OwnProps, InjectedTranslateProps {
  service: {
    programMakeSignal(
      id: string,
      successFee: number,
      volumeFee: number
    ): Promise<void>;
  };
}

interface State {
  errorMessage: string;
}
