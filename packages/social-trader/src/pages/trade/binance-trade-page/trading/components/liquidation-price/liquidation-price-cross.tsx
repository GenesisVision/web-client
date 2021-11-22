import React, { useContext } from "react";

import { TerminalFuturesBalanceContext } from "../../contexts/terminal-futures-balance.context";
import { useCalculateCrossLiqPrice } from "../../trading-tables/positions/positions.helpers";
import { terminalMoneyFormat } from "../terminal-money-format/terminal-money-format";
import { LiquidationPriceLessThanZeroTooltip } from "./liquidation-price-less-than-zero-tooltip";

interface Props {
  tickSize: string;
  symbol: string;
}

const _LiquidationPriceCross: React.FC<Props> = ({ tickSize, symbol }) => {
  const { crossPositionInfo, futureBalance } = useContext(
    TerminalFuturesBalanceContext
  );
  const liquidationPrice = useCalculateCrossLiqPrice({
    symbol,
    crossMaintMargin: crossPositionInfo
      ? crossPositionInfo.crossMaintMargin
      : 0,
    crossPnl: crossPositionInfo ? crossPositionInfo.crossPnl : 0,
    crossWalletBalance: futureBalance ? futureBalance.crossWalletBalance : 0
  });
  return (
    <>
      {liquidationPrice <= 0 ? (
        <LiquidationPriceLessThanZeroTooltip />
      ) : (
        terminalMoneyFormat({
          amount: liquidationPrice,
          tickSize
        })
      )}
    </>
  );
};

const LiquidationPriceCross = React.memo(_LiquidationPriceCross);
export default LiquidationPriceCross;
