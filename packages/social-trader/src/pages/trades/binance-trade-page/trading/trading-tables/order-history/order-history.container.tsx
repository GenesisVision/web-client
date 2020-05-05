import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { getAllOrders } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import { filterOrderEventsStream } from "pages/trades/binance-trade-page/trading/services/binance-ws.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { normalizeOpenOrdersList } from "pages/trades/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  ExecutionReport,
  QueryOrderResult
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";

import { OrderHistory } from "./order-history";

interface Props {}

export const OrderHistoryContainer: React.FC<Props> = () => {
  const { authData } = useTradeAuth();

  const {
    userStream,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [list, setList] = useState<{
    [key: string]: QueryOrderResult;
  }>({});
  const [socketData, setSocketData] = useState<ExecutionReport | undefined>();

  useEffect(() => {
    if (!authData.publicKey || !userStream) return;
    const openOrders = getAllOrders(getSymbol(baseAsset, quoteAsset), authData);
    openOrders.pipe(map(normalizeOpenOrdersList)).subscribe(data => {
      setList(data);
    });
    const openOrdersStream = filterOrderEventsStream(userStream);
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [authData, baseAsset, quoteAsset, userStream]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    if (
      false
      // socketData.orderStatus === "EXPIRED" ||
      // socketData.orderStatus === "FILLED" ||
      // socketData.orderStatus === "CANCELED" ||
      // socketData.executionType === "CANCELED" ||
      // socketData.executionType === "EXPIRED"
    )
      delete updatedList[socketData!.orderId];
    else
      updatedList[socketData.orderId] = {
        ...updatedList[socketData.orderId],
        ...socketData
      };
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list), [list]);
  return <OrderHistory items={items} />;
};
