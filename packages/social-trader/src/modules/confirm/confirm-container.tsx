import Dialog from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import { IGoogleActivateStepFormValues } from "modules/2fa/google-auth/google-auth-steps/google-auth-activate-step";
import GoogleAuthStepsContainer from "modules/2fa/google-auth/google-auth-steps/google-auth-steps";
import React, { useCallback } from "react";
import { postponeCallback } from "utils/hook-form.helpers";

import { confirm2fa, get2faInfo } from "./services/confirm.services";

const _ConfirmContainer: React.FC<Props> = ({
  onClose,
  programId,
  open,
  onApply
}) => {
  const onCloseMiddleware = postponeCallback(onClose);
  const {
    errorMessage,
    cleanErrorMessage,
    sendRequest: confirm
  } = useApiRequest({
    middleware: [onCloseMiddleware, onApply],
    request: confirm2fa
  });
  const { data } = useApiRequest({
    request: () => get2faInfo({ programId }),
    fetchOnMount: true
  });

  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(
    (values: IGoogleActivateStepFormValues) => {
      confirm({ ...values, programId });
    },
    [programId]
  );
  if (!data) return null;
  return (
    <Dialog open={open} onClose={handleClose}>
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
