import Dialog, { IDialogProps } from "components/dialog/dialog";
import { FundWithdrawPopupContainer } from "modules/fund-withdraw/fund-withdraw-popup.container";
import * as React from "react";

import { IFundWithdrawPopupProps } from "./fund-withdraw-popup";

const _FundWithdrawDialog: React.FC<IFundWithdrawDialogProps> = ({
  id,
  open,
  onClose
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <FundWithdrawPopupContainer onClose={onClose} id={id} />
    </Dialog>
  );
};

export interface IFundWithdrawDialogProps
  extends IDialogProps,
    IFundWithdrawPopupProps {
  id: string;
}

export const FundWithdrawDialog = React.memo(_FundWithdrawDialog);
