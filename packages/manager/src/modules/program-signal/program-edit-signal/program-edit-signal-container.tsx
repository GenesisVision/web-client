import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { IDialogProps } from "shared/components/dialog/dialog";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";

import ProgramSignalPopup from "../program-signal-popup/program-signal-popup";
import { programEditSignal } from "./services/program-edit-signal.service";

const _ProgramEditSignalContainer: React.FC<Props> = ({
  t,
  service: { programEditSignal, dispatchProgramDescription },
  ...others
}) => (
  <ProgramSignalPopup
    header={t("program-details-page.description.edit-signal-provider.title")}
    serviceMethod={programEditSignal}
    onApply={dispatchProgramDescription}
    {...others}
  />
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    {
      programEditSignal,
      dispatchProgramDescription
    },
    dispatch
  )
});

const ProgramEditSignalContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramEditSignalContainer);

export default ProgramEditSignalContainer;

interface OwnProps extends IDialogProps {
  programDescription: ProgramDetailsFull;
}

interface Props extends OwnProps, WithTranslation {
  service: {
    programEditSignal(values: {
      id: string;
      successFee: number;
      volumeFee: number;
    }): Promise<void>;
    dispatchProgramDescription: () => void;
  };
}
