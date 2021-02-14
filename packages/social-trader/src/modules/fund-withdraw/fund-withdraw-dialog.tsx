import Dialog, { IDialogProps } from "components/dialog/dialog";
import dynamic from "next/dynamic";
import * as React from "react";

import { IFundWithdrawPopupProps } from "./fund-withdraw-popup";

const FundWithdrawPopupContainer = dynamic(
  () => import("modules/fund-withdraw/fund-withdraw-popup.container")
);

const _FundWithdrawDialog: React.FC<IFundWithdrawDialogProps> = ({
  renderAssetPopup,
  infoMessage,
  onApply,
  id,
  open,
  onClose
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <FundWithdrawPopupContainer
        renderAssetPopup={renderAssetPopup}
        infoMessage={infoMessage}
        onApply={onApply}
        onClose={onClose}
        id={id}
      />
    </Dialog>
  );
};

export interface IFundWithdrawDialogProps
  extends IDialogProps,
  IFundWithdrawPopupProps {
  id: string;
}

export const FundWithdrawDialog = React.memo(_FundWithdrawDialog);
