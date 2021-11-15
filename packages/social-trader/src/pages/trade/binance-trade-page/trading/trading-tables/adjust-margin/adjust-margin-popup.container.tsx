import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { BinancePositionSide } from "gv-api-web";
import React from "react";

import AdjustMarginPopup from "./adjust-margin-popup";

interface Props extends IDialogOuterProps {
  quoteAsset: string;
  tickSize: string;
  positionSide: BinancePositionSide;
  symbol: string;
  entryPrice: number;
  markPrice: number;
  maintAmount: number;
  maintMarginRate: number;
  leverage: number;
  maintMargin: number;
  quantity: number;
  margin: number;
}

const _AdjustMarginPopupContainer: React.FC<Props> = ({
  tickSize,
  quoteAsset,
  open,
  onClose,
  margin,
  leverage,
  maintAmount,
  maintMarginRate,
  entryPrice,
  maintMargin,
  quantity,
  markPrice,
  symbol,
  positionSide
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <AdjustMarginPopup
        quoteAsset={quoteAsset}
        tickSize={tickSize}
        maintAmount={maintAmount}
        maintMarginRate={maintMarginRate}
        entryPrice={entryPrice}
        leverage={leverage}
        maintMargin={maintMargin}
        markPrice={markPrice}
        quantity={quantity}
        symbol={symbol}
        margin={margin}
        positionSide={positionSide}
        onClose={onClose}
      />
    </Dialog>
  );
};

const AdjustMarginPopupContainer = React.memo(_AdjustMarginPopupContainer);
export default AdjustMarginPopupContainer;
