import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import { OrderBookCurrentPrice } from "pages/trade/binance-trade-page/trading/order-book/order-book-current-price";
import React, { useContext } from "react";

export const OrderBookFuturesCurrentPriceContainer: React.FC = () => {
  const { trades } = useContext(TradingPriceContext);
  const { markPrice } = useContext(TerminalTickerContext);
  const lastTrade = trades[0];
  if (!lastTrade || !markPrice) return null;

  return (
    <OrderBookCurrentPrice
      tradeId={lastTrade.orderId}
      price={lastTrade.price}
      markPrice={markPrice.markPrice}
    />
  );
};
