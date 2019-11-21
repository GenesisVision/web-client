import { IDialogProps } from "components/dialog/dialog";
import { ProgramDetailsFull } from "gv-api-web";
import { dispatchProgramDescription } from "pages/programs/program-details/service/program-details.service";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose, Dispatch } from "redux";

import ProgramSignalPopup from "../program-signal-popup/program-signal-popup";
import { programMakeSignal } from "./services/program-make-signal.service";

const _ProgramMakeSignalContainer: React.FC<Props> = ({
  t,
  service: { programMakeSignal, dispatchProgramDescription },
  ...others
}) => (
  <ProgramSignalPopup
    header={t("program-details-page.description.signal-provider.title")}
    serviceMethod={programMakeSignal}
    onApply={dispatchProgramDescription}
    {...others}
  />
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    {
      programMakeSignal,
      dispatchProgramDescription
    },
    dispatch
  )
});

const ProgramMakeSignalContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramMakeSignalContainer);

export default ProgramMakeSignalContainer;

interface OwnProps extends IDialogProps {
  programDescription: ProgramDetailsFull;
}

interface Props extends OwnProps, WithTranslation {
  service: {
    programMakeSignal(values: {
      id: string;
      successFee: number;
      volumeFee: number;
    }): Promise<void>;
    dispatchProgramDescription: () => void;
  };
}
