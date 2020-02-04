import Dialog, { IDialogProps } from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { twoFactorEnabledSelector } from "reducers/2fa-reducer";
import { SetSubmittingType } from "utils/types";

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
  const twoFactorEnabled = useSelector(twoFactorEnabledSelector);
  const { errorMessage, cleanErrorMessage, sendRequest } = useApiRequest({
    successMessage: "password-change-trading-account.success-alert-message",
    middleware: [onClose],
    request: changePasswordTradingAccount
  });
  const handleApply = useCallback(
    (
      values: IChangePasswordTradingAccountFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const model = {
        password: values.password,
        twoFactorCode: values.twoFactorCode
      };
      sendRequest({ id, model }, setSubmitting);
    },
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
        twoFactorEnabled={twoFactorEnabled}
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
