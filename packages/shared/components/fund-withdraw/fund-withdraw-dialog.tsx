import * as React from "react";
import Dialog from "shared/components/dialog/dialog";
import { IDialogProps } from "shared/components/dialog/dialog";

import FundWithdrawPopup, {
  IFundWithdrawPopupProps
} from "./fund-withdraw-popup";

interface IFundWithdrawDialogProps
  extends IDialogProps,
    IFundWithdrawPopupProps {}

const FundWithdrawDialog: React.FC<IFundWithdrawDialogProps> = ({
  open,
  onClose,
  accountCurrency,
  fetchInfo,
  withdraw
}) => (
  <Dialog open={open} onClose={onClose}>
    <FundWithdrawPopup
      withdraw={withdraw}
      accountCurrency={accountCurrency}
      fetchInfo={fetchInfo}
    />
  </Dialog>
);

export default FundWithdrawDialog;
