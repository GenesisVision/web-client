import Dialog, { IDialogProps } from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { useCallback } from "react";
import { useTFAStatus } from "utils/2fa";
import { postponeCallback } from "utils/hook-form.helpers";

import { IChangePasswordTradingAccountFormValues } from "./components/change-password-trading-account-form";
import { changePasswordTradingAccount } from "./services/change-password-trading-account.service";

const ChangePasswordTradingAccountForm = dynamic(() =>
  import("./components/change-password-trading-account-form")
);

const _ChangePasswordTradingAccountPopup: React.FC<Props> = ({
  open,
  programName,
  id,
  onClose
}) => {
  const onCloseMiddleware = postponeCallback(onClose);
  const { twoFactorEnabled } = useTFAStatus();
  const { errorMessage, cleanErrorMessage, sendRequest } = useApiRequest({
    successMessage: "password-change-trading-account.success-alert-message",
    middleware: [onCloseMiddleware],
    request: changePasswordTradingAccount
  });
  const handleApply = useCallback(
    (model: IChangePasswordTradingAccountFormValues) =>
      sendRequest({ id, model }),
    [id]
  );
  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <ChangePasswordTradingAccountForm
        programName={programName}
        twoFactorEnabled={twoFactorEnabled!}
        errorMessage={errorMessage}
        onSubmit={handleApply}
      />
    </Dialog>
  );
};

interface Props extends IDialogProps {
  id: string;
  programName: string;
}

const ChangePasswordTradingAccountPopup = React.memo(
  _ChangePasswordTradingAccountPopup
);
export default ChangePasswordTradingAccountPopup;
