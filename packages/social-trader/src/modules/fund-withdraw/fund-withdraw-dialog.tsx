import * as React from "react";
import { useEffect } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import FormError from "shared/components/form/form-error/form-error";
import useApiRequest from "shared/hooks/api-request.hook";

import {
  FundWithdrawPopup,
  IFundWithdrawPopupProps
} from "./fund-withdraw-popup";
import { FundWithdrawLoaderData } from "./fund-withdraw.loader";
import { getFundWithdrawInfo } from "./services/fund-withdraw.services";

const _FundWithdrawDialog: React.FC<IFundWithdrawDialogProps> = ({
  id,
  open,
  onClose
}) => {
  const { data, sendRequest, errorMessage } = useApiRequest({
    request: getFundWithdrawInfo
  });
  useEffect(() => {
    open && sendRequest({ id });
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <FundWithdrawPopup
        onClose={onClose}
        id={id}
        loaderData={FundWithdrawLoaderData}
        data={data!}
      />
      <FormError error={errorMessage} />
    </Dialog>
  );
};

export interface IFundWithdrawDialogProps
  extends IDialogProps,
    IFundWithdrawPopupProps {
  id: string;
}

export const FundWithdrawDialog = React.memo(_FundWithdrawDialog);
