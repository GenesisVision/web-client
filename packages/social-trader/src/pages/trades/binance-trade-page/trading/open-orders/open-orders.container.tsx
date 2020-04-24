import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { OpenOrders } from "pages/trades/binance-trade-page/trading/open-orders/open-orders";
import { normalizeOpenOrdersList } from "pages/trades/binance-trade-page/trading/open-orders/open-orders.helpers";
import { getOpenOrders } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import { filterOpenOrdersStream } from "pages/trades/binance-trade-page/trading/services/binance-ws.helpers";
import { getUserStreamSocket } from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  ExecutionReport,
  QueryOrderResult
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";
import { useSockets } from "services/websocket.service";

interface Props {}

export const OpenOrdersContainer: React.FC<Props> = () => {
  const { authData } = useTradeAuth();
  const { connectSocket } = useSockets();

  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [list, setList] = useState<{
    [key: string]: QueryOrderResult;
  }>({});
  const [socketData, setSocketData] = useState<ExecutionReport | undefined>();

  useEffect(() => {
    if (!authData.publicKey) return;
    const openOrders = getOpenOrders(
      getSymbol(baseAsset, quoteAsset),
      authData
    );
    openOrders.pipe(map(normalizeOpenOrdersList)).subscribe(data => {
      setList(data);
    });
    const openOrdersStream = filterOpenOrdersStream(
      getUserStreamSocket(connectSocket, authData)
    );
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [authData, baseAsset, quoteAsset]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    updatedList[socketData.orderId] = {
      ...updatedList[socketData.orderId],
      ...socketData
    };
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list), [list]);
  return <OpenOrders items={items} />;
};
