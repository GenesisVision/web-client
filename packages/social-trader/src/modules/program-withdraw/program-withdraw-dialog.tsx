import Dialog, { IDialogProps } from "components/dialog/dialog";
import FormError from "components/form/form-error/form-error";
import { ProgramWithdrawInfo } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useEffect } from "react";

import { ProgramWithdrawInfoLoaderData } from "./program-withdraw-dialog.loader";
import ProgramWithdrawPopup, {
  IProgramWithdrawPopupProps
} from "./program-withdraw-popup";
import { getProgramWithdrawInfo } from "./services/program-withdraw.services";

const _ProgramWithdrawDialog: React.FC<Props> = ({
  id,
  open,
  onClose,
  accountCurrency,
  assetCurrency
}) => {
  const { errorMessage, data, sendRequest } = useApiRequest<
    ProgramWithdrawInfo
  >({ request: getProgramWithdrawInfo });
  useEffect(() => {
    open && sendRequest({ id });
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        id={id}
        onClose={onClose}
        data={data!}
        loaderData={ProgramWithdrawInfoLoaderData}
        accountCurrency={accountCurrency}
        assetCurrency={assetCurrency}
      />
      <FormError error={errorMessage} />
    </Dialog>
  );
};

interface Props extends IDialogProps, IProgramWithdrawPopupProps {
  id: string;
}

const ProgramWithdrawDialog = React.memo(_ProgramWithdrawDialog);
export default ProgramWithdrawDialog;
