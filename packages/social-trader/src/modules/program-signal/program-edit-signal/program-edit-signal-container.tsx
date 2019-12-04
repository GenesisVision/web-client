import { IDialogProps } from "components/dialog/dialog";
import { ProgramDetailsFull } from "gv-api-web";
import { dispatchProgramDescription } from "pages/programs/program-details/service/program-details.service";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose, Dispatch } from "redux";

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
