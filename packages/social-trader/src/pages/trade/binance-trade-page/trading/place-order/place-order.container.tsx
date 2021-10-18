import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import { getFilterValues } from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import { PlaceOrderSpot } from "pages/trade/binance-trade-page/trading/place-order/place-order-spot";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React, { useContext, useMemo } from "react";

import { PlaceOrderFutures } from "./place-order-futures";

const _PlaceOrderContainer: React.FC = () => {
  const { price, trades } = useContext(TradingPriceContext);
  const {
    symbol: { baseAsset, quoteAsset },
    exchangeInfo,
    terminalType
  } = useContext(TerminalInfoContext);

  const filterValues = useMemo(
    () =>
      exchangeInfo
        ? getFilterValues(exchangeInfo, getSymbol(baseAsset, quoteAsset))
        : undefined,
    [baseAsset, quoteAsset]
  );

  if (!+price || !trades || !trades[0] || !filterValues) return null;
  // memo problem
  return terminalType === "futures" ? (
    <PlaceOrderFutures
      filterValues={filterValues}
      price={price}
      lastTrade={trades[0].price}
    />
  ) : (
    <PlaceOrderSpot
      filterValues={filterValues}
      price={price}
      lastTrade={trades[0].price}
    />
  );
};

export const PlaceOrderContainer = React.memo(_PlaceOrderContainer);
