import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  filterOrderEventsStream,
  getSymbol
} from "pages/trades/binance-trade-page/trading/terminal.helpers";
import {
  ExecutionReport,
  QueryOrderResult
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";

import { OpenOrders } from "./open-orders";
import { normalizeOpenOrdersList } from "./open-orders.helpers";

interface Props {}

export const OpenOrdersContainer: React.FC<Props> = () => {
  const { getOpenOrders } = useContext(TerminalMethodsContext);

  const {
    terminalType,
    authData,
    userStream,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [list, setList] = useState<{
    [key: string]: QueryOrderResult;
  }>({});
  const [socketData, setSocketData] = useState<ExecutionReport | undefined>();

  useEffect(() => {
    if (!authData.publicKey || !userStream) return;
    const openOrders = getOpenOrders(
      getSymbol(baseAsset, quoteAsset),
      authData
    );
    openOrders.pipe(map(normalizeOpenOrdersList)).subscribe(data => {
      setList(data);
    });
    const openOrdersStream = filterOrderEventsStream(userStream);
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [authData, baseAsset, quoteAsset, terminalType, userStream]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    if (
      socketData.orderStatus === "EXPIRED" ||
      socketData.orderStatus === "FILLED" ||
      socketData.orderStatus === "CANCELED" ||
      socketData.executionType === "CANCELED" ||
      socketData.executionType === "EXPIRED"
    )
      delete updatedList[socketData.orderId];
    else
      updatedList[socketData.orderId] = {
        ...updatedList[socketData.orderId],
        ...socketData
      };
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list), [list]);
  return <OpenOrders items={items} />;
};
