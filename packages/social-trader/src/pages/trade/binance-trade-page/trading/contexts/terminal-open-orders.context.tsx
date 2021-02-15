import { useAlerts } from "hooks/alert.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import {
  filterOrderEventsStream,
  generateOrderMessage,
  getSymbol
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";

type TerminalOpenOrdersContextState = { openOrders?: UnitedOrder[] };

export const TerminalOpenOrdersInitialState = {} as TerminalOpenOrdersContextState;

export const TerminalOpenOrdersContext = createContext<TerminalOpenOrdersContextState>(
  TerminalOpenOrdersInitialState
);

export const TerminalOpenOrdersContextProvider: React.FC = ({ children }) => {
  const { successAlert } = useAlerts();
  const { items: symbols } = useContext(TerminalTickerContext);
  const { getOpenOrders } = useContext(TerminalMethodsContext);

  const {
    exchangeAccountId,
    terminalType,
    userStream,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [list, setList] = useState<{
    [key: string]: UnitedOrder;
  }>({});
  const [socketData, setSocketData] = useState<UnitedOrder | undefined>();

  useEffect(() => {
    if (!exchangeAccountId || !userStream) return;
    const openOrders = getOpenOrders(
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
  }, [exchangeAccountId, terminalType, userStream]);

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
      delete updatedList[socketData.id];
    else
      updatedList[socketData.id] = {
        ...updatedList[socketData.id],
        ...socketData
      };
    if (socketData.eventType === "executionReport" && symbols) {
      const symbolData = symbols.find(
        data => data.symbol === socketData.symbol
      );
      if (symbolData) {
        const message = generateOrderMessage(socketData, symbolData);
        successAlert(message);
      }
    }
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(
    () => ({
      openOrders: Object.values(list).sort(
        (a, b) => +new Date(b.time) - +new Date(a.time)
      )
    }),
    [list]
  );
  return (
    <TerminalOpenOrdersContext.Provider value={items}>
      {children}
    </TerminalOpenOrdersContext.Provider>
  );
};
