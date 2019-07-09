import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import useErrorMessage from "shared/hooks/error-message.hook";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import ProgramSignalForm, {
  IProgramSignalFormValues
} from "./components/program-signal-form";

const _ProgramSignalPopup: React.FC<Props> = ({
  programDescription,
  serviceMethod,
  onClose,
  onApply,
  open,
  header
}) => {
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const handleApply = useCallback(
    (values: IProgramSignalFormValues, setSubmitting: SetSubmittingType) => {
      serviceMethod(
        programDescription.id,
        values.successFee!,
        values.volumeFee!
      )
        .then(() => {
          handleClose();
          onApply();
        })
        .catch(error => {
          setSubmitting(false);
          setErrorMessage(error);
        });
    },
    []
  );
  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  const signalSuccessFee = programDescription.isSignalProgram
    ? programDescription.signalSuccessFee
    : undefined;
  const signalVolumeFee = programDescription.isSignalProgram
    ? programDescription.signalVolumeFee
    : undefined;
  return (
    <Dialog open={open} onClose={handleClose}>
      <ProgramSignalForm
        errorMessage={errorMessage}
        onSubmit={handleApply}
        header={header}
        programName={programDescription.title}
        signalSuccessFee={signalSuccessFee}
        signalVolumeFee={signalVolumeFee}
      />
    </Dialog>
  );
};

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
