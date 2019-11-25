import Dialog from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import GoogleAuthStepsContainer from "modules/2fa/google-auth/google-auth-steps/google-auth-steps";
import React, { useCallback, useEffect } from "react";
import { SetSubmittingType } from "utils/types";

import { IConfirmFormValues } from "./components/confirm-form";
import * as service from "./services/confirm.services";

const _ConfirmContainer: React.FC<Props> = ({
  onClose,
  programId,
  open,
  onApply
}) => {
  const {
    errorMessage,
    cleanErrorMessage,
    sendRequest: confirm
  } = useApiRequest({
    middleware: [onClose, onApply],
    request: service.confirm
  });
  const { data, sendRequest: get2faInfo } = useApiRequest({
    request: service.get2faInfo
  });

  useEffect(() => {
    get2faInfo({ programId });
  }, []);

  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(
    (values: IConfirmFormValues, setSubmitting: SetSubmittingType) => {
      confirm({ ...values, programId }, setSubmitting);
    },
    [programId]
  );
  if (!data) return null;
  return (
    <Dialog className={"dialog--width-auto"} open={open} onClose={handleClose}>
      <GoogleAuthStepsContainer
        authenticatorUri={data.authenticatorUri}
        sharedKey={data.sharedKey}
        onSubmit={handleConfirm}
        errorMessage={errorMessage}
        enablePassword={false}
      />
    </Dialog>
  );
};

export interface IConfirmProgramProps {
  programId: string;
}

interface OwnProps {
  onApply: () => void;
  open: boolean;
  onClose: () => void;
}

interface Props extends IConfirmProgramProps, OwnProps {}

const ConfirmContainer = React.memo(_ConfirmContainer);
export default ConfirmContainer;
