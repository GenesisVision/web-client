import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/terminal-methods.context";
import {
  filterOrderEventsStream,
  getSymbol
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  ExecutionReport,
  QueryOrderResult
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { map } from "rxjs/operators";

type TerminalOpenOrdersContextState = { openOrders?: QueryOrderResult[] };

export const TerminalOpenOrdersInitialState = {} as TerminalOpenOrdersContextState;

export const TerminalOpenOrdersContext = createContext<
  TerminalOpenOrdersContextState
>(TerminalOpenOrdersInitialState);

export const TerminalOpenOrdersContextProvider: React.FC = ({ children }) => {
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
    if (!authData?.publicKey || !userStream) return;
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

  const items = useMemo(
    () => ({
      openOrders: Object.values(list)
    }),
    [list]
  );
  return (
    <TerminalOpenOrdersContext.Provider value={items}>
      {children}
    </TerminalOpenOrdersContext.Provider>
  );
};
