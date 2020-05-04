import { getSymbolPrice } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { getSymbolPriceFilter } from "pages/trades/binance-trade-page/trading/place-order/place-order.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingTickerContext } from "pages/trades/binance-trade-page/trading/trading-ticker.context";
import {
  formatValueWithTick,
  getSymbol
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import React, { useContext } from "react";
import { safeGetElemFromArray } from "utils/helpers";

interface Props {
  asset: string;
  available: string;
  locked: string;
}

const _FundsFRow: React.FC<Props> = ({ asset, available, locked }) => {
  const ticker = useContext(TradingTickerContext);
  const { exchangeInfo } = useContext(TradingInfoContext);
  if (!exchangeInfo) return null;

  const symbol = getSymbol(asset, "BTC");
  const filters = safeGetElemFromArray(
    exchangeInfo.symbols,
    item => item.symbol === symbol
  ).filters;
  const { tickSize } = getSymbolPriceFilter(filters);
  const price = ticker ? getSymbolPrice(ticker, symbol) : 0;
  const total = formatValueWithTick(+available + +locked, "0.00000001");
  const btcValue = formatValueWithTick(+total * +price, tickSize);
  return (
    <tr>
      <td>{asset}</td>
      <td>{total}</td>
      <td>{available}</td>
      <td>{locked}</td>
      <td>{btcValue}</td>
    </tr>
  );
};

export const FundsRow = React.memo(_FundsFRow);
