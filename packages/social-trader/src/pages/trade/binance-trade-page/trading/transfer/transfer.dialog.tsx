import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import dynamic from "next/dynamic";
import { ITransferContainerProps } from "pages/trade/binance-trade-page/trading/transfer/transfer.container";
import React from "react";

const TransferContainer = dynamic(() => import("./transfer.container"));

export const TransferDialog: React.FC<IDialogOuterProps &
  ITransferContainerProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <TransferContainer {...props} />
    </Dialog>
  );
};
