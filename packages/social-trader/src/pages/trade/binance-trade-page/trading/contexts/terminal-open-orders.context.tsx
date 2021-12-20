import { useAlerts } from "hooks/alert.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-ticker.context";
import {
  filterOrderEventsStream,
  generateSpotOrderMessage
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  FuturesOrder,
  SpotOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useTranslation } from "react-i18next";
import { map } from "rxjs/operators";

import { FUTURES_ACCOUNT_EVENT } from "../../services/futures/binance-futures.types";
import { generateFuturesOrderMessage } from "../terminal-futures.helpers";

type TerminalOpenOrdersContextState = {
  openOrders: SpotOrder[] | FuturesOrder[];
};

export const TerminalOpenOrdersInitialState = {} as TerminalOpenOrdersContextState;

export const TerminalOpenOrdersContext = createContext<TerminalOpenOrdersContextState>(
  TerminalOpenOrdersInitialState
);

export const TerminalOpenOrdersContextProvider: React.FC = ({ children }) => {
  const { successAlert } = useAlerts();
  const { items: symbols } = useContext(TerminalTickerContext);
  const { getOpenOrders } = useContext(TerminalMethodsContext);
  const [t] = useTranslation();

  const { exchangeAccountId, terminalType, $userStream } = useContext(
    TerminalInfoContext
  );

  const [list, setList] = useState<{
    [key: string]: SpotOrder | FuturesOrder;
  }>({});
  const [socketData, setSocketData] = useState<
    SpotOrder | FuturesOrder | undefined
  >();

  useEffect(() => {
    if (!exchangeAccountId || !$userStream) return;
    const openOrders = getOpenOrders(exchangeAccountId);
    openOrders.pipe(map(normalizeOpenOrdersList)).subscribe(data => {
      setList(data);
    });
    const openOrdersStream = filterOrderEventsStream($userStream);
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [exchangeAccountId, $userStream]);

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
      delete updatedList[socketData.orderId];
    else
      updatedList[socketData.orderId] = {
        ...updatedList[socketData.orderId],
        ...socketData
      };
    if (
      (socketData.eventType === "executionReport" ||
        socketData.eventType === FUTURES_ACCOUNT_EVENT.orderTradeUpdate) &&
      symbols
    ) {
      const symbolData = symbols.find(
        data => data.symbol === socketData.symbol
      );
      if (symbolData) {
        const message =
          terminalType === "futures"
            ? generateFuturesOrderMessage(
                socketData as FuturesOrder,
                symbolData,
                t
              )
            : generateSpotOrderMessage(socketData as SpotOrder, symbolData);
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
    // Fix type
    <TerminalOpenOrdersContext.Provider value={items as any}>
      {children}
    </TerminalOpenOrdersContext.Provider>
  );
};
