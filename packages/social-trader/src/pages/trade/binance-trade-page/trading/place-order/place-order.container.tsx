import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { getFilterValues } from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import { PlaceOrderSpot } from "pages/trade/binance-trade-page/trading/place-order/place-order-spot";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React, { useContext, useMemo } from "react";

import { TerminalTickerContext } from "../contexts/terminal-ticker.context";
import { PlaceOrderFutures } from "./place-order-futures";

const _PlaceOrderContainer: React.FC = () => {
  const { items, markPrice } = useContext(TerminalTickerContext);
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

  const currentSymbol = items?.find(
    item => item.symbol === getSymbol(baseAsset, quoteAsset)
  );

  if (
    !filterValues ||
    (!markPrice && terminalType === "futures") ||
    !currentSymbol
  ) {
    return null;
  }

  return terminalType === "futures" ? (
    <PlaceOrderFutures
      markPrice={markPrice!.markPrice}
      filterValues={filterValues}
      lastTrade={currentSymbol.lastPrice}
    />
  ) : (
    <PlaceOrderSpot
      filterValues={filterValues}
      lastTrade={currentSymbol.lastPrice}
    />
  );
};

export const PlaceOrderContainer = React.memo(_PlaceOrderContainer);
