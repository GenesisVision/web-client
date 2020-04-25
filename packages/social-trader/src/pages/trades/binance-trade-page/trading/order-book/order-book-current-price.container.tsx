import { useGetRate } from "hooks/get-rate.hook";
import { OrderBookCurrentPrice } from "pages/trades/binance-trade-page/trading/order-book/order-book-current-price";
import { tradeSocket } from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { Trade } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { headerAccountCurrencySelector } from "reducers/header-reducer";
import { useSockets } from "services/websocket.service";

export const OrderBookCurrentPriceContainer: React.FC = () => {
  const { setPrice, price } = useContext(TradingPriceContext);
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);
  const accountCurrency = useSelector(headerAccountCurrencySelector);
  const { rate, getRate } = useGetRate();
  useEffect(() => {
    if (baseAsset && accountCurrency)
      getRate({ from: baseAsset, to: accountCurrency });
  }, [accountCurrency, baseAsset]);

  const { connectSocket } = useSockets();
  const [tradeSocketData, setTradeSocketData] = useState<Trade | undefined>();
  useEffect(() => {
    const tradeStream = tradeSocket(
      connectSocket,
      getSymbol(baseAsset, quoteAsset)
    );
    tradeStream.subscribe(data => {
      setTradeSocketData(data);
    });
  }, [baseAsset, quoteAsset]);
  useEffect(() => {
    if (+price === 0 && tradeSocketData) {
      setPrice(tradeSocketData.price);
    }
  }, [tradeSocketData]);
  return (
    <OrderBookCurrentPrice
      tradeId={tradeSocketData?.tradeId}
      price={tradeSocketData ? tradeSocketData.price : "0"}
      currency={baseAsset}
      equivalent={tradeSocketData ? String(+tradeSocketData.price * rate) : "0"}
      equivalentCurrency={accountCurrency}
    />
  );
};
