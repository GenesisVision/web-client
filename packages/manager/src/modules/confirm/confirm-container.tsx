import { TwoFactorAuthenticator } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import Dialog from "shared/components/dialog/dialog";
import useErrorMessage from "shared/hooks/error-message.hook";
import GoogleAuthStepsContainer from "shared/modules/2fa/google-auth/google-auth-steps/google-auth-steps";
import { SetSubmittingType } from "shared/utils/types";

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
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const [data, setData] = useState<TwoFactorAuthenticator | undefined>(
    undefined
  );
  useEffect(() => {
    service.get2faInfo({ programId }).then(setData);
  }, []);
  const handleClose = useCallback(
    () => {
      cleanErrorMessage();
      onClose();
    },
    [onClose]
  );
  const handleConfirm = useCallback(
    (values: IConfirmFormValues, setSubmitting: SetSubmittingType) => {
      service
        .confirm({ ...values, programId })
        .then(() => {
          handleClose();
          onApply && onApply();
        })
        .catch(setErrorMessage)
        .then(() => setSubmitting(false));
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
