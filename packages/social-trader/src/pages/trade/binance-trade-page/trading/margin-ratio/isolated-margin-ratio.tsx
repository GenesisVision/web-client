import React, { useContext } from "react";

import { TerminalFuturesPositionsContext } from "../contexts/terminal-futures-positions.context";
import { TerminalTickerContext } from "../contexts/terminal-ticker.context";
import { Position } from "../terminal.types";
import {
  calculateIsolatedMarginRatioInfo,
  calculateUnrealizedPNL
} from "../trading-tables/positions/positions.helpers";
import { MarginRatioView } from "./margin-ratio-view";

interface Props {
  position: Position;
}

const _IsolatedMarginRatio: React.FC<Props> = ({
  position: { symbol, isolatedMargin, unrealizedPnL, quantity, entryPrice }
}) => {
  const { markPrices } = useContext(TerminalTickerContext);
  const { leverageBrackets } = useContext(TerminalFuturesPositionsContext);
  const mark = markPrices?.find(item => item.symbol === symbol);
  const markPrice = mark ? mark.markPrice : entryPrice;
  const notionalSize = Math.abs(markPrice * quantity);

  const margin = isolatedMargin - unrealizedPnL;

  const { markPnl } = calculateUnrealizedPNL({
    quantity,
    entryPrice,
    markPrice
  });

  const {
    maintMargin,
    marginBalance,
    marginRatio
  } = calculateIsolatedMarginRatioInfo({
    pnl: markPnl,
    margin,
    notionalSize,
    symbol,
    leverageBrackets
  });
  return (
    <MarginRatioView
      maintMargin={maintMargin}
      marginBalance={marginBalance}
      marginRatio={marginRatio}
    />
  );
};

export const IsolatedMarginRatio = React.memo(_IsolatedMarginRatio);
