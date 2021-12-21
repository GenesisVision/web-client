import Dialog, { IDialogProps } from "components/dialog/dialog";
import { BinancePositionSide } from "gv-api-web";
import React from "react";

import { FuturesOrder } from "../../terminal.types";
import TakeProfitStopLossPopup from "./take-profit-stop-loss-popup";

interface Props extends IDialogProps {
  entryPrice: number;
  markPrice: number;
  symbol: string;
  leverage: number;
  tickSize: string;
  quantity: number;
  positionSide: BinancePositionSide;
  takeProfitOrder?: FuturesOrder;
  stopLossOrder?: FuturesOrder;
}

const _TakeProfitStopLossPopupContainer: React.FC<Props> = ({
  open,
  onClose,
  entryPrice,
  markPrice,
  symbol,
  tickSize,
  leverage,
  quantity,
  positionSide,
  takeProfitOrder,
  stopLossOrder
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <TakeProfitStopLossPopup
        onClose={onClose}
        entryPrice={entryPrice}
        markPrice={markPrice}
        symbol={symbol}
        leverage={leverage}
        tickSize={tickSize}
        quantity={quantity}
        positionSide={positionSide}
        takeProfitOrder={takeProfitOrder}
        stopLossOrder={stopLossOrder}
      />
    </Dialog>
  );
};

const TakeProfitStopLossPopupContainer = React.memo(
  _TakeProfitStopLossPopupContainer
);
export default TakeProfitStopLossPopupContainer;
