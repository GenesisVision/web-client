import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import { PlaceOrder } from "pages/trade/binance-trade-page/trading/place-order/place-order";
import React, { useContext } from "react";

const _PlaceOrderContainer: React.FC = () => {
  const { price, trades } = useContext(TradingPriceContext);

  if (!+price || !trades || !trades[0]) return null;

  return <PlaceOrder price={price} lastTrade={trades[0].price} />;
};

export const PlaceOrderContainer = React.memo(_PlaceOrderContainer);
