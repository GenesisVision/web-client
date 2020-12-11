import { useAccountCurrency } from "hooks/account-currency.hook";
import { OrderBookCurrentPrice } from "pages/trade/binance-trade-page/trading/order-book/order-book-current-price";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/terminal-ticker.context";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/trading-price.context";
import React, { useContext, useMemo } from "react";
import { formatValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";

export const OrderBookCurrentPriceContainer: React.FC = () => {
  const { trades } = useContext(TradingPriceContext);
  const {
    symbol: { quoteAsset }
  } = useContext(TerminalInfoContext);
  const accountCurrency = "USDT"; //useAccountCurrency();
  const { items: tickerItems } = useContext(TerminalTickerContext);
  const lastTrade = trades[0];
  if (!lastTrade || !tickerItems) return null;

  const accountCurrencySymbol = `${quoteAsset}${accountCurrency}`.toUpperCase();
  const accountCurrencySymbolPrice =
    accountCurrency !== quoteAsset
      ? safeGetElemFromArray(
          tickerItems,
          ({ name }) => name === accountCurrencySymbol
        ).lastPrice
      : undefined;

  return (
    <OrderBookCurrentPrice
      tradeId={lastTrade.orderId}
      price={lastTrade.price}
      equivalent={
        accountCurrencySymbolPrice
          ? formatValue(+lastTrade.price * +accountCurrencySymbolPrice)
          : undefined
      }
      equivalentCurrency={accountCurrency}
    />
  );
};
