import { BinanceTradeContainer } from "pages/trades/binance-trade-page/binance-trade.container";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TerminalType } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

import "../trades.scss";

interface Props {
  type?: TerminalType;
  symbol?: SymbolState;
}

export const BinanceTrade: React.FC<Props> = ({ type, symbol }) => {
  return <BinanceTradeContainer type={type} symbol={symbol} />;
};
