import Dialog, { IDialogProps } from "components/dialog/dialog";
import { ProgramWithdrawInfo } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import dynamic from "next/dynamic";
import * as React from "react";
import { useEffect } from "react";

import { ProgramWithdrawInfoLoaderData } from "./program-withdraw-dialog.loader";
import { IProgramWithdrawPopupProps } from "./program-withdraw-popup";
import { getProgramWithdrawInfo } from "./services/program-withdraw.services";

const ProgramWithdrawPopup = dynamic(() => import("./program-withdraw-popup"));

const _ProgramWithdrawDialog: React.FC<Props> = ({
  isProcessingRealTime,
  onApply,
  id,
  open,
  onClose,
  accountCurrency,
  assetCurrency
}) => {
  const { data, sendRequest } = useApiRequest<ProgramWithdrawInfo>({
    name: "getProgramWithdrawInfo",
    cache: true,
    request: getProgramWithdrawInfo
  });
  useEffect(() => {
    open && sendRequest({ id });
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        isProcessingRealTime={isProcessingRealTime}
        onApply={onApply}
        id={id}
        onClose={onClose}
        data={data!}
        loaderData={ProgramWithdrawInfoLoaderData}
        accountCurrency={accountCurrency}
        assetCurrency={assetCurrency}
      />
    </Dialog>
  );
};

interface Props extends IDialogProps, IProgramWithdrawPopupProps {
  id: string;
}

const ProgramWithdrawDialog = React.memo(_ProgramWithdrawDialog);
export default ProgramWithdrawDialog;
