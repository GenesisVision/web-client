import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import useApiRequest from "shared/hooks/api-request.hook";
import { SetSubmittingType } from "shared/utils/types";

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
  const { errorMessage, cleanErrorMessage, sendRequest } = useApiRequest({
    request: serviceMethod
  });
  const handleApply = useCallback(
    (values: IProgramSignalFormValues, setSubmitting: SetSubmittingType) => {
      sendRequest(
        {
          id: programDescription.id,
          successFee: values.successFee!,
          volumeFee: values.volumeFee!
        },
        setSubmitting
      )
        .then(onApply)
        .then(handleClose);
    },
    []
  );
  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  const signalSuccessFee = programDescription.signalSettings
    ? programDescription.signalSettings.signalSuccessFee
    : undefined;
  const signalVolumeFee = programDescription.signalSettings
    ? programDescription.signalSettings.signalVolumeFee
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
  serviceMethod(values: {
    id: string;
    successFee: number;
    volumeFee: number;
  }): Promise<void>;
}
