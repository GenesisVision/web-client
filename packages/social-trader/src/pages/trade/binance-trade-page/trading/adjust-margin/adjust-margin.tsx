import { PencilIcon } from "components/icon/pencil-icon";
import { BinancePositionSide } from "gv-api-web";
import useFlag from "hooks/flag.hook";
import React from "react";

import AdjustMarginPopupContainer from "./adjust-margin-popup.container";

interface Props {
  quoteAsset: string;
  tickSize: string;
  positionSide: BinancePositionSide;
  symbol: string;
  margin: number;
  entryPrice: number;
  maintAmount: number;
  maintMarginRate: number;
  markPrice: number;
  leverage: number;
  maintMargin: number;
  quantity: number;
}

const _AdjustMargin: React.FC<Props> = ({
  quoteAsset,
  tickSize,
  symbol,
  positionSide,
  margin,
  maintAmount,
  maintMarginRate,
  leverage,
  entryPrice,
  maintMargin,
  quantity,
  markPrice
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useFlag();
  return (
    <>
      <PencilIcon onClick={setOpenPopup} />
      <AdjustMarginPopupContainer
        quoteAsset={quoteAsset}
        tickSize={tickSize}
        maintAmount={maintAmount}
        maintMarginRate={maintMarginRate}
        entryPrice={entryPrice}
        leverage={leverage}
        maintMargin={maintMargin}
        markPrice={markPrice}
        quantity={quantity}
        open={isOpenPopup}
        onClose={setClosePopup}
        symbol={symbol}
        positionSide={positionSide}
        margin={margin}
      />
    </>
  );
};

const AdjustMargin = React.memo(_AdjustMargin);
export default AdjustMargin;
