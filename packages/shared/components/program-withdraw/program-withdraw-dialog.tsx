import { ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import FormError from "shared/components/form/form-error/form-error";
import useApiRequest from "shared/hooks/api-request.hook";

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
  const { errorMessage, data, sendRequest } = useApiRequest<
    ProgramWithdrawInfo
  >({ request: fetchInfo });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        condition={!!data}
        programWithdrawInfo={data!}
        loader={<DialogLoader />}
        withdraw={withdraw}
        accountCurrency={accountCurrency}
        assetCurrency={assetCurrency}
        fetchInfo={fetchInfo}
      />
      <FormError error={errorMessage} />
    </Dialog>
  );
};

const ProgramWithdrawDialog = React.memo(_ProgramWithdrawDialog);
export default ProgramWithdrawDialog;
