import { BinanceTradeContainer } from "pages/trades/binance-trade-page/binance-trade.container";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React from "react";

import "../trades.scss";

interface Props {
  symbol?: SymbolState;
}

export const BinanceTrade: React.FC<Props> = ({ symbol }) => {
  return <BinanceTradeContainer symbol={symbol} />;
};
