import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { filterOrderEventsStream } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import { isOrderDeleted } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.helpers";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";

import { OrderHistory } from "./order-history";

export const OrderHistoryContainer: React.FC = () => {
  const { getAllOrders } = useContext(TerminalMethodsContext);

  const { exchangeAccountId, userStream } = useContext(TerminalInfoContext);

  const [list, setList] = useState<{
    [key: string]: UnitedOrder;
  }>({});
  const [socketData, setSocketData] = useState<UnitedOrder | undefined>();

  useEffect(() => {
    if (!exchangeAccountId || !userStream) return;
    const openOrders = getAllOrders(exchangeAccountId);
    openOrders.pipe(map(normalizeOpenOrdersList)).subscribe(data => {
      setList(data);
    });
    const openOrdersStream = filterOrderEventsStream(userStream);
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [exchangeAccountId, userStream]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    if (isOrderDeleted(socketData.orderStatus, socketData.executionType))
      delete updatedList[socketData!.id];
    else
      updatedList[socketData.id] = {
        ...updatedList[socketData.id],
        ...socketData
      };
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(
    () =>
      Object.values(list)
        .reverse()
        .sort((a, b) => {
          return +new Date(b.time) - +new Date(a.time);
        }),
    [list]
  );
  return <OrderHistory items={items} />;
};
