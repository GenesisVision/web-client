import { BinancePositionSide } from "gv-api-web";
import React, { useMemo } from "react";

import { terminalMoneyFormat } from "../components/terminal-money-format/terminal-money-format";
import { calculateIsolatedLiqPrice } from "../trading-tables/positions/positions.helpers";
import { LiquadationPriceLessThanZeroTooltip } from "./liquidation-price-less-than-zero-tooltip";

interface Props {
  tickSize: string;
  entryPrice: number;
  isolatedWallet: number;
  maintAmount: number;
  maintMarginRate: number;
  positionSide: BinancePositionSide;
  quantity: number;
}

const _LiquidationPriceIsolated: React.FC<Props> = ({
  tickSize,
  entryPrice,
  isolatedWallet,
  maintAmount,
  maintMarginRate,
  positionSide,
  quantity
}) => {
  const liquidationPrice = useMemo(
    () =>
      calculateIsolatedLiqPrice({
        entryPrice,
        isolatedWallet,
        maintAmount,
        maintMarginRate,
        positionSide,
        quantity
      }),
    [
      entryPrice,
      isolatedWallet,
      maintAmount,
      maintMarginRate,
      positionSide,
      quantity
    ]
  );
  return (
    <>
      {liquidationPrice <= 0 ? (
        <LiquadationPriceLessThanZeroTooltip />
      ) : (
        terminalMoneyFormat({
          amount: liquidationPrice,
          tickSize
        })
      )}
    </>
  );
};

const LiquidationPriceIsolated = React.memo(_LiquidationPriceIsolated);
export default LiquidationPriceIsolated;
