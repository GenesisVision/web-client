import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/terminal-methods.context";
import {
  filterOrderEventsStream,
  getSymbol
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";

import { OrderHistory } from "./order-history";

interface Props {}

export const OrderHistoryContainer: React.FC<Props> = () => {
  const { getAllOrders } = useContext(TerminalMethodsContext);

  const {
    exchangeAccountId,
    userStream,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [list, setList] = useState<{
    [key: string]: UnitedOrder;
  }>({});
  const [socketData, setSocketData] = useState<UnitedOrder | undefined>();

  useEffect(() => {
    if (!exchangeAccountId || !userStream) return;
    const openOrders = getAllOrders(
      getSymbol(baseAsset, quoteAsset),
      exchangeAccountId
    );
    openOrders.pipe(map(normalizeOpenOrdersList)).subscribe(data => {
      setList(data);
    });
    const openOrdersStream = filterOrderEventsStream(userStream);
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [exchangeAccountId, baseAsset, quoteAsset, userStream]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    if (
      socketData.orderStatus?.toLowerCase() === "expired" ||
      socketData.orderStatus?.toLowerCase() === "filled" ||
      socketData.orderStatus?.toLowerCase() === "canceled" ||
      socketData.executionType?.toLowerCase() === "canceled" ||
      socketData.executionType?.toLowerCase() === "expired"
    )
      delete updatedList[socketData!.id];
    else
      updatedList[socketData.id] = {
        ...updatedList[socketData.id],
        ...socketData
      };
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list).reverse(), [list]);
  return <OrderHistory items={items} />;
};
