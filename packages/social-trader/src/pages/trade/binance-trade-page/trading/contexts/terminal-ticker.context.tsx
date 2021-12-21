import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  filterTrading,
  normalizeMarketList,
  normalizeMarkPricesList,
  normalizeSymbolsList
} from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import {
  MarkPrice,
  MergedTickerSymbolType,
  Symbol,
  Ticker
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { map } from "rxjs/operators";
import { useSockets } from "services/websocket.service";
import { safeGetElemFromArray } from "utils/helpers";

import { getSymbolFromState } from "../terminal.helpers";

type TerminalTickerContextState = {
  getFavorites: VoidFunction;
  items?: MergedTickerSymbolType[];
  markPrices?: MarkPrice[];
  markPrice?: MarkPrice;
};

export const TerminalTickerInitialState: TerminalTickerContextState = {
  getFavorites: () => {}
};

export const TerminalTickerContext = createContext<TerminalTickerContextState>(
  TerminalTickerInitialState
);

export const TerminalTickerContextProvider: React.FC = ({ children }) => {
  const {
    getTickers,
    marketTicketsSocket,
    getFavorites,
    getMarkPrices,
    markPricesSocket
  } = useContext(TerminalMethodsContext);
  const [normalizedSymbols, setNormalizedSymbols] = useState<{
    [key: string]: Symbol;
  }>({});
  const [requestData, setRequestData] = useState<{
    [key: string]: Ticker;
  }>({});
  const [list, setList] = useState<{
    [key: string]: MergedTickerSymbolType;
  }>({});
  const [socketData, setSocketData] = useState<{
    [key: string]: Ticker;
  }>({});
  const [markPricesList, setMarkPricesList] = useState<{
    [key: string]: MarkPrice;
  }>({});
  const [markPricesRequestData, setMarkPricesRequestData] = useState<{
    [key: string]: MarkPrice;
  }>({});
  const [markPricesSocketData, setMarkPricesSocketData] = useState<{
    [key: string]: MarkPrice;
  }>({});

  const { connectSocket } = useSockets();

  const { exchangeAccountId, exchangeInfo, terminalType, symbol } = useContext(
    TerminalInfoContext
  );

  const isFutures = terminalType === "futures";

  const {
    data: accountFavorites,
    sendRequest: getFavoritesList
  } = useApiRequest({
    request: () => getFavorites(exchangeAccountId)
  });

  useEffect(() => {
    getFavoritesList();
  }, [exchangeInfo, exchangeAccountId]);

  useEffect(() => {
    if (accountFavorites) {
      const updatedList = { ...list };
      Object.keys(updatedList).forEach(symbol => {
        updatedList[symbol] = {
          ...updatedList[symbol],
          isFavorite: accountFavorites.includes(symbol)
        };
      });
      setList(updatedList);
    }
  }, [accountFavorites]);

  useEffect(() => {
    if (exchangeInfo) {
      const normalizedSymbols = normalizeSymbolsList(exchangeInfo.symbols);
      setNormalizedSymbols(normalizedSymbols);
      setList(
        normalizedSymbols as {
          [key: string]: MergedTickerSymbolType;
        }
      );
      setRequestData({});
      setMarkPricesRequestData({});
    }
  }, [exchangeInfo]);

  useEffect(() => {
    if (!Object.values(normalizedSymbols).length) return;
    const requestData = getTickers().pipe(map(normalizeMarketList));
    requestData.subscribe(setRequestData);
    const ticketsSocket = marketTicketsSocket(connectSocket).pipe(
      map(normalizeMarketList)
    );
    ticketsSocket.subscribe(setSocketData);

    if (!getMarkPrices || !markPricesSocket) {
      return;
    }
    const markPricesRequestData = getMarkPrices().pipe(
      map(normalizeMarkPricesList)
    );
    markPricesRequestData.subscribe(setMarkPricesRequestData);
    const markSocket = markPricesSocket(connectSocket).pipe(
      map(normalizeMarkPricesList)
    );
    markSocket.subscribe(setMarkPricesSocketData);
  }, [normalizedSymbols]);

  useEffect(() => {
    if (!Object.values(socketData).length) return;
    const updatedList = { ...list };
    Object.keys(socketData).forEach(name => {
      Object.keys(socketData[name]).forEach(field => {
        // @ts-ignore
        updatedList[name][field] = socketData[name][field];
      });
    });
    setList(updatedList);
  }, [socketData]);

  useEffect(() => {
    if (!Object.values(markPricesSocketData).length) return;
    const updatedList = { ...markPricesList };
    Object.keys(markPricesSocketData).forEach(name => {
      Object.keys(markPricesSocketData[name]).forEach(field => {
        // @ts-ignore
        updatedList[name][field] = markPricesSocketData[name][field];
      });
    });
    setMarkPricesList(updatedList);
  }, [markPricesSocketData]);

  useEffect(() => {
    if (!Object.values(requestData).length) return;
    const updatedList = { ...list };
    Object.keys(requestData).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...requestData[name] };
    });
    setList(updatedList);
  }, [requestData]);

  useEffect(() => {
    if (!Object.values(markPricesRequestData).length && !isFutures) return;
    const updatedList = { ...markPricesList };
    Object.keys(markPricesRequestData).forEach(name => {
      updatedList[name] = {
        ...updatedList[name],
        ...markPricesRequestData[name]
      };
    });
    setMarkPricesList(updatedList);
  }, [markPricesRequestData]);

  const items = useMemo(() => Object.values(list).filter(filterTrading), [
    list
  ]);

  const markPrices = useMemo(() => Object.values(markPricesList), [
    markPricesList
  ]);

  const markPrice = useMemo(
    () =>
      markPrices
        ? safeGetElemFromArray(
            markPrices,
            item => item.symbol === getSymbolFromState(symbol)
          )
        : undefined,
    [markPrices, symbol]
  );

  const value = useMemo(
    () => ({
      items: Object.values(requestData).length ? items : undefined,
      getFavorites: getFavoritesList,
      markPrice,
      markPrices: Object.values(markPricesRequestData).length
        ? markPrices
        : undefined
    }),
    [requestData, markPricesRequestData, items, markPrices, markPrice]
  );

  return (
    <TerminalTickerContext.Provider value={value}>
      {children}
    </TerminalTickerContext.Provider>
  );
};
