import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { IDialogProps } from "shared/components/dialog/dialog";

import ProgramSignalPopup from "../program-signal-popup/program-signal-popup";
import { programMakeSignal } from "./services/program-make-signal.service";

const _ProgramMakeSignalContainer: React.FC<Props> = ({
  t,
  service,
  ...others
}) => (
  <ProgramSignalPopup
    header={t("program-details-page.description.signal-provider.title")}
    serviceMethod={service.programMakeSignal}
    {...others}
  />
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    {
      programMakeSignal
    },
    dispatch
  )
});

const ProgramMakeSignalContainer = compose<React.ComponentType<OwnProps>>(
  React.memo,
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_ProgramMakeSignalContainer);

export default ProgramMakeSignalContainer;

interface OwnProps extends IDialogProps {
  programDescription: ProgramDetailsFull;
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
