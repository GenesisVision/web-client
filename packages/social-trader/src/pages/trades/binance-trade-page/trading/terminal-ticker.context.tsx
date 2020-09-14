import useApiRequest from "hooks/api-request.hook";
import {
  filterTrading,
  normalizeMarketList,
  normalizeSymbolsList
} from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  MergedTickerSymbolType,
  Symbol,
  Ticker
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { map } from "rxjs/operators";
import { api } from "services/api-client/swagger-custom-client";
import { useSockets } from "services/websocket.service";

type TerminalTickerContextState = {
  getFavorites: VoidFunction;
  items?: MergedTickerSymbolType[];
};

const getAccountFavorites = async (id?: string) =>
  id
    ? await api
        .terminal()
        .getTradingPlatformFavoriteSymbols(id)
        .then(({ items }) => items)
    : [];

export const TerminalTickerInitialState: TerminalTickerContextState = {
  getFavorites: () => {}
};

export const TerminalTickerContext = createContext<TerminalTickerContextState>(
  TerminalTickerInitialState
);

export const TerminalTickerContextProvider: React.FC = ({ children }) => {
  const { getTickers, marketTicketsSocket } = useContext(
    TerminalMethodsContext
  );
  const [requestData, setRequestData] = useState<{
    [key: string]: Ticker;
  }>({});
  const [normalizedSymbols, setNormalizedSymbols] = useState<{
    [key: string]: Symbol;
  }>({});
  const [list, setList] = useState<{
    [key: string]: MergedTickerSymbolType;
  }>({});
  const [socketData, setSocketData] = useState<{
    [key: string]: Ticker;
  }>({});
  const { connectSocket } = useSockets();

  const { exchangeAccountId, exchangeInfo } = useContext(TerminalInfoContext);

  const { data: accountFavorites, sendRequest: getFavorites } = useApiRequest({
    request: () => getAccountFavorites(exchangeAccountId)
  });

  useEffect(() => {
    getFavorites();
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
  }, [normalizedSymbols]);

  useEffect(() => {
    if (!Object.values(socketData).length) return;
    const updatedList = { ...list };
    Object.keys(socketData).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...socketData[name] };
    });
    setList(updatedList);
  }, [socketData]);

  useEffect(() => {
    if (!Object.values(requestData).length) return;
    const updatedList = { ...list };
    Object.keys(requestData).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...requestData[name] };
    });
    setList(updatedList);
  }, [requestData]);

  const items = useMemo(() => Object.values(list).filter(filterTrading), [
    list
  ]);

  const value = useMemo(
    () => ({
      items: Object.values(requestData).length ? items : undefined,
      getFavorites
    }),
    [requestData, items]
  );

  return (
    <TerminalTickerContext.Provider value={value}>
      {children}
    </TerminalTickerContext.Provider>
  );
};
