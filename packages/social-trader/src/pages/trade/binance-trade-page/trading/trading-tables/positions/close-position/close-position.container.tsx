import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import { getSymbolFilters } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  ClosePosition,
  IClosePositionProps
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/close-position/close-position";
import React, { useContext, useMemo } from "react";
import { safeGetElemFromArray } from "utils/helpers";

interface Props extends IClosePositionProps {}

const _ClosePositionContainer: React.FC<Props> = ({ symbol, ...rest }) => {
  const { items } = useContext(TerminalTickerContext);
  const {
    symbol: { baseAsset, quoteAsset },
    exchangeInfo
  } = useContext(TerminalInfoContext);

  const filters = useMemo(
    () => (exchangeInfo ? getSymbolFilters(exchangeInfo, symbol) : undefined),
    [baseAsset, quoteAsset]
  );

  if (!items?.length || !filters) return null;

  const price = safeGetElemFromArray(items, item => item.symbol === symbol)
    .lastPrice;

  return (
    <ClosePosition
      {...rest}
      price={price}
      symbol={symbol}
      stepSize={String(filters.lotSizeFilter.stepSize)}
      tickSize={String(filters.priceFilter.tickSize)}
    />
  );
};

export const ClosePositionContainer = React.memo(_ClosePositionContainer);
