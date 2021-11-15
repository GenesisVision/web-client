import { Text } from "components/text/text";
import { BinanceFuturesMarginType, BinancePositionSide } from "gv-api-web";
import React from "react";

import LiquidationPriceCross from "./liquidation-price-cross";
import LiquidationPriceIsolated from "./liquidation-price-isolated";

interface Props {
  tickSize: string;
  marginType: BinanceFuturesMarginType;
  entryPrice: number;
  isolatedWallet: number;
  positionSide: BinancePositionSide;
  quantity: number;
  symbol: string;
  maintAmount?: number;
  maintMarginRate?: number;
}

const _LiquidationPriceCell: React.FC<Props> = ({
  tickSize,
  marginType,
  symbol,
  entryPrice,
  isolatedWallet,
  maintAmount,
  maintMarginRate,
  positionSide,
  quantity
}) => {
  return (
    <Text color={"yellow"}>
      {marginType === "Isolated" ? (
        <LiquidationPriceIsolated
          tickSize={tickSize}
          quantity={quantity}
          entryPrice={entryPrice}
          positionSide={positionSide}
          isolatedWallet={isolatedWallet}
          maintMarginRate={maintMarginRate!}
          maintAmount={maintAmount!}
        />
      ) : (
        <LiquidationPriceCross tickSize={tickSize} symbol={symbol} />
      )}
    </Text>
  );
};

const LiquidationPriceCell = React.memo(_LiquidationPriceCell);
export default LiquidationPriceCell;
