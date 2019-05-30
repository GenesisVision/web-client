import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { IDialogProps } from "shared/components/dialog/dialog";

import ProgramSignalPopup from "../program-signal-popup/program-signal-popup";
import { programEditSignal } from "./services/program-edit-signal.service";

class _ProgramEditSignalContainer extends React.Component<Props> {
  render() {
    const { t, service, ...others } = this.props;
    return (
      <ProgramSignalPopup
        header={t(
          "program-details-page.description.edit-signal-provider.title"
        )}
        serviceMethod={service.programEditSignal}
        {...others}
      />
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

const ProgramEditSignalContainer = compose<React.ComponentType<OwnProps>>(
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
