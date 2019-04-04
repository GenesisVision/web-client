import * as React from "react";
import Dialog from "shared/components/dialog/dialog";
import { IDialogProps } from "shared/components/dialog/dialog";

// import {
//   IFundWithdrawPopupProps
// } from "./fund-withdraw-popup";
import ProgramWithdrawPopup from "./program-withdraw-popup";

const ProgramWithdrawDialog: React.FC<
  IDialogProps
  // > = ({ open, onClose, accountCurrency, fetchInfo, withdraw }) => (
> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    {/*<ProgramWithdrawPopup*/}
    {/*withdraw={withdraw}*/}
    {/*accountCurrency={accountCurrency}*/}
    {/*fetchInfo={fetchInfo}*/}
    {/*/>*/}
  </Dialog>
);

export default ProgramWithdrawDialog;
