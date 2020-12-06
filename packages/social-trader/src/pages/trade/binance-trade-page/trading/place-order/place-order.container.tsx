import { PlaceOrder } from "pages/trade/binance-trade-page/trading/place-order/place-order";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/trading-price.context";
import React, { useContext } from "react";

const _PlaceOrderContainer: React.FC = () => {
  const { price } = useContext(TradingPriceContext);

  return !!+price ? <PlaceOrder price={price} /> : null;
};

export const PlaceOrderContainer = React.memo(_PlaceOrderContainer);
