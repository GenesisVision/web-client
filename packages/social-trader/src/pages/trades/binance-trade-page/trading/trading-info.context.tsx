import useApiRequest from "hooks/api-request.hook";
import { useTradeAuth } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  filterOutboundAccountInfoStream,
  updateAccountInfo
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  Account,
  ExchangeInfo,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Observable } from "rxjs";
import { useSockets } from "services/websocket.service";

export type SymbolState = {
  quoteAsset: TradeCurrency;
  baseAsset: TradeCurrency;
};

type TradingAccountInfoState = {
  userStream?: Observable<any>;
  setSymbol: (symbol: SymbolState) => void;
  symbol: SymbolState;
  accountInfo?: Account;
  exchangeInfo?: ExchangeInfo;
};

const SymbolInitialState: SymbolState = {
  quoteAsset: "USDT",
  baseAsset: "BTC"
};

export const TradingAccountInfoInitialState: TradingAccountInfoState = {
  setSymbol: () => {},
  symbol: SymbolInitialState
};

export const TradingInfoContext = createContext<TradingAccountInfoState>(
  TradingAccountInfoInitialState
);

export const TradingInfoContextProvider: React.FC = ({ children }) => {
  const {
    getExchangeInfo,
    getAccountInformation,
    getUserStreamKey,
    getUserStreamSocket
  } = useContext(TerminalMethodsContext);
  const { authData } = useTradeAuth();
  const { connectSocket } = useSockets();

  const { data: exchangeInfo } = useApiRequest<ExchangeInfo>({
    request: getExchangeInfo,
    fetchOnMount: true
  });

  const [userStreamKey, setUserStreamKey] = useState<string | undefined>();
  const [userStream, setUserStream] = useState<Observable<any> | undefined>();
  const [symbol, setSymbol] = useState<SymbolState>(SymbolInitialState);
  const [accountInfo, setAccountInfo] = useState<Account | undefined>();
  const [socketData, setSocketData] = useState<Account | undefined>(undefined);

  useEffect(() => {
    if (!authData.publicKey) return;
    const accountInfo = getAccountInformation(authData);
    accountInfo.subscribe(data => {
      setAccountInfo(data);
    });
    getUserStreamKey(authData).subscribe(({ listenKey }) =>
      setUserStreamKey(listenKey)
    );
  }, [authData]);

  useEffect(() => {
    if (!userStreamKey) return;
    const userStream = getUserStreamSocket(connectSocket, userStreamKey);
    setUserStream(userStream);
    const accountInfoStream = filterOutboundAccountInfoStream(userStream);
    accountInfoStream.subscribe(data => {
      setSocketData(data);
    });
  }, [userStreamKey]);

  useEffect(() => {
    if (!socketData || !accountInfo) return;
    const updatedData = updateAccountInfo(accountInfo, socketData);
    setAccountInfo(updatedData);
  }, [socketData]);

  const value = useMemo(
    () => ({ userStream, setSymbol, symbol, accountInfo, exchangeInfo }),
    [userStream, setSymbol, symbol, accountInfo, exchangeInfo]
  );

  return (
    <TradingInfoContext.Provider value={value}>
      {children}
    </TradingInfoContext.Provider>
  );
};
