import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import { PlaceOrder } from "pages/trade/binance-trade-page/trading/place-order/place-order";
import React, { useContext, useMemo } from "react";
import { getFilterValues } from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";

const _PlaceOrderContainer: React.FC = () => {
  const { price, trades } = useContext(TradingPriceContext);
  const {
    symbol: { baseAsset, quoteAsset },
    exchangeInfo
  } = useContext(TerminalInfoContext);

  const filterValues = useMemo(
    () =>
      exchangeInfo
        ? getFilterValues(exchangeInfo, getSymbol(baseAsset, quoteAsset))
        : undefined,
    [baseAsset, quoteAsset]
  );

  if (!+price || !trades || !trades[0] || !filterValues) return null;

  return (
    <PlaceOrder
      filterValues={filterValues}
      price={price}
      lastTrade={trades[0].price}
    />
  );
};

export const PlaceOrderContainer = React.memo(_PlaceOrderContainer);
