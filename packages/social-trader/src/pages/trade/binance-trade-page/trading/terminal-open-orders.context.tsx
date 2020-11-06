import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/terminal-methods.context";
import {
  filterOrderEventsStream,
  getSymbol
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeOpenOrdersList } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.helpers";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { map } from "rxjs/operators";

type TerminalOpenOrdersContextState = { openOrders?: UnitedOrder[] };

export const TerminalOpenOrdersInitialState = {} as TerminalOpenOrdersContextState;

export const TerminalOpenOrdersContext = createContext<
  TerminalOpenOrdersContextState
>(TerminalOpenOrdersInitialState);

export const TerminalOpenOrdersContextProvider: React.FC = ({ children }) => {
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
  }, [exchangeAccountId, baseAsset, quoteAsset, terminalType, userStream]);

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
