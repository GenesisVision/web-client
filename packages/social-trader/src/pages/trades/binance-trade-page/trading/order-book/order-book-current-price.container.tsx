import { useGetRate } from "hooks/get-rate.hook";
import { OrderBookCurrentPrice } from "pages/trades/binance-trade-page/trading/order-book/order-book-current-price";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { headerAccountCurrencySelector } from "reducers/header-reducer";

export const OrderBookCurrentPriceContainer: React.FC = () => {
  const { trades } = useContext(TradingPriceContext);
  const {
    symbol: { baseAsset }
  } = useContext(TradingInfoContext);
  const accountCurrency = useSelector(headerAccountCurrencySelector);
  const { rate, getRate } = useGetRate();
  useEffect(() => {
    if (baseAsset && accountCurrency)
      getRate({ from: baseAsset, to: accountCurrency });
  }, [accountCurrency, baseAsset]);

  const lastTrade = trades[0];
  if (!lastTrade) return null;
  return (
    <OrderBookCurrentPrice
      tradeId={lastTrade.id}
      price={lastTrade.price}
      currency={baseAsset}
      equivalent={String(+lastTrade.price * rate)}
      equivalentCurrency={accountCurrency}
    />
  );
};
