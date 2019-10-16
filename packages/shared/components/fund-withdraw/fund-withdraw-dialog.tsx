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
import { FundWithdrawalInfoResponse } from "./fund-withdraw.types";

const _FundWithdrawDialog: React.FC<IFundWithdrawDialogProps> = ({
  open,
  onClose,
  accountCurrency,
  fetchInfo,
  withdraw
}) => {
  const { data, sendRequest, errorMessage } = useApiRequest({
    request: fetchInfo
  });
  useEffect(
    () => {
      open && sendRequest();
    },
    [open]
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <FundWithdrawPopup
        loaderData={FundWithdrawLoaderData}
        data={data!}
        withdraw={withdraw}
        accountCurrency={accountCurrency}
      />
      <FormError error={errorMessage} />
    </Dialog>
  );
};

export interface IFundWithdrawDialogProps
  extends IDialogProps,
    IFundWithdrawPopupProps {
  fetchInfo: () => Promise<FundWithdrawalInfoResponse>;
}

export const FundWithdrawDialog = React.memo(_FundWithdrawDialog);
