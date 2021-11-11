import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import { OrderBookCurrentPrice } from "pages/trade/binance-trade-page/trading/order-book/order-book-current-price";
import React, { useContext } from "react";

import { getSymbolFromState } from "../terminal.helpers";

export const OrderBookFuturesCurrentPriceContainer: React.FC = () => {
  const { trades } = useContext(TradingPriceContext);
  const { symbol: currentSymbol } = useContext(TerminalInfoContext);
  const { markPrices } = useContext(TerminalTickerContext);
  const lastTrade = trades[0];
  if (!lastTrade || !markPrices) return null;

  const markPrice = markPrices.find(
    ({ symbol }) => symbol === getSymbolFromState(currentSymbol)
  )?.markPrice;

  return (
    <OrderBookCurrentPrice
      tradeId={lastTrade.orderId}
      price={lastTrade.price}
      markPrice={markPrice}
    />
  );
};
