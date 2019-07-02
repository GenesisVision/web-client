import * as React from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";

import ProgramWithdrawPopup, {
  IProgramWithdrawPopupProps
} from "./program-withdraw-popup";

const ProgramWithdrawDialog: React.FC<
  IDialogProps & IProgramWithdrawPopupProps
> = React.memo(
  ({ open, onClose, accountCurrency, assetCurrency, fetchInfo, withdraw }) => (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        withdraw={withdraw}
        accountCurrency={accountCurrency}
        assetCurrency={assetCurrency}
        fetchInfo={fetchInfo}
      />
    </Dialog>
  )
);

export default ProgramWithdrawDialog;
