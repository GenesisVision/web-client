import { BinanceTradeContainer } from "pages/trades/binance-trade-page/binance-trade.container";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

import "../trades.scss";

interface Props {
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

export const BinanceTrade: React.FC<Props> = ({ authData, type, symbol }) => {
  return (
    <BinanceTradeContainer authData={authData} type={type} symbol={symbol} />
  );
};
