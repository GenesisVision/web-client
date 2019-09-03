import { ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import FormError from "shared/components/form/form-error/form-error";
import useErrorMessage from "shared/hooks/error-message.hook";

import ProgramWithdrawPopup, {
  IProgramWithdrawPopupProps
} from "./program-withdraw-popup";

const _ProgramWithdrawDialog: React.FC<
  IDialogProps & IProgramWithdrawPopupProps
> = ({
  open,
  onClose,
  accountCurrency,
  assetCurrency,
  fetchInfo,
  withdraw
}) => {
  const [programWithdrawInfo, setProgramWithdrawInfo] = useState<
    ProgramWithdrawInfo | undefined
  >(undefined);
  const { errorMessage, setErrorMessage } = useErrorMessage();
  useEffect(
    () => {
      fetchInfo()
        .then(setProgramWithdrawInfo)
        .catch(setErrorMessage);
    },
    [fetchInfo, setErrorMessage]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        condition={!!programWithdrawInfo}
        programWithdrawInfo={programWithdrawInfo!}
        loader={<DialogLoader />}
        withdraw={withdraw}
        accountCurrency={accountCurrency}
        assetCurrency={assetCurrency}
        fetchInfo={fetchInfo}
      />
      <div className="form-error">
        <FormError error={errorMessage} />
      </div>
    </Dialog>
  );
};

const ProgramWithdrawDialog = React.memo(_ProgramWithdrawDialog);
export default ProgramWithdrawDialog;
