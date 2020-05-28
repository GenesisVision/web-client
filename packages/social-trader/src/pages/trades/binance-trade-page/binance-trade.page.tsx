import { BrokerTradeServerType } from "gv-api-web";
import { BinanceTradeContainer } from "pages/trades/binance-trade-page/binance-trade.container";
import { SymbolState } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  TerminalType,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

interface Props {
  brokerType?: BrokerTradeServerType;
  authData: TradeAuthDataType;
  type?: TerminalType;
  symbol?: SymbolState;
}

export const BinanceTrade: React.FC<Props> = ({
  brokerType,
  authData,
  type,
  symbol
}) => {
  switch (brokerType) {
    case "Binance":
    default:
      return (
        <BinanceTradeContainer
          authData={authData}
          type={type}
          symbol={symbol}
        />
      );
  }
};
