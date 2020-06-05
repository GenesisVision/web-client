import {
  getLotSizeFilter,
  getSymbolPriceFilter
} from "pages/trades/binance-trade-page/trading/place-order/place-order.helpers";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  filterOutboundAccountInfoStream,
  getSymbolFilters,
  getSymbolFromState,
  stringifySymbolFromToParam,
  updateAccountInfo,
  useUpdateTerminalUrlParams
} from "pages/trades/binance-trade-page/trading/terminal.helpers";
import {
  Account,
  ExchangeInfo,
  TerminalType,
  TradeAuthDataType,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { TERMINAL_ROUTE } from "routes/trade.routes";
import { Observable } from "rxjs";
import { useSockets } from "services/websocket.service";

interface Props {
  exchangeInfo: ExchangeInfo;
  authData: TradeAuthDataType;
  outerSymbol?: SymbolState;
  terminalType: TerminalType;
}

export type SymbolState = {
  quoteAsset: TradeCurrency;
  baseAsset: TradeCurrency;
};

type TerminalAccountInfoState = {
  stepSize: string;
  tickSize: string;
  authData: TradeAuthDataType;
  terminalType: TerminalType;
  userStream?: Observable<any>;
  setSymbol: (symbol: SymbolState) => void;
  symbol: SymbolState;
  accountInfo?: Account;
  exchangeInfo?: ExchangeInfo;
};

export const TerminalTypeInitialState: TerminalType = "spot";

export const SymbolInitialState: SymbolState = {
  quoteAsset: "USDT",
  baseAsset: "BTC"
};

export const TerminalAccountInfoInitialState: TerminalAccountInfoState = {
  stepSize: "0.01",
  tickSize: "0.01",
  authData: {
    publicKey: "",
    privateKey: ""
  },
  terminalType: TerminalTypeInitialState,
  setSymbol: () => {},
  symbol: SymbolInitialState
};

export const TerminalInfoContext = createContext<TerminalAccountInfoState>(
  TerminalAccountInfoInitialState
);

export const TerminalInfoContextProvider: React.FC<Props> = ({
  exchangeInfo,
  authData: authDataProp,
  outerSymbol: symbol = SymbolInitialState,
  terminalType,
  children
}) => {
  const updateUrl = useUpdateTerminalUrlParams();

  const {
    getAccountInformation,
    getUserStreamKey,
    getUserStreamSocket
  } = useContext(TerminalMethodsContext);
  const [authData] = useState<TradeAuthDataType>(authDataProp);
  const { connectSocket } = useSockets();

  const [tickSize, setTickSize] = useState<string>("0.01");
  const [stepSize, setStepSize] = useState<string>("0.01");
  const [userStreamKey, setUserStreamKey] = useState<string | undefined>();
  const [userStream, setUserStream] = useState<Observable<any> | undefined>();
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
  }, [authData, getAccountInformation, getUserStreamKey]);

  useEffect(() => {
    if (!userStreamKey) return;
    const userStream = getUserStreamSocket(connectSocket, userStreamKey);
    setUserStream(userStream);
    const accountInfoStream = filterOutboundAccountInfoStream(userStream);
    accountInfoStream.subscribe(data => {
      setSocketData(data);
    });
  }, [userStreamKey, getUserStreamSocket]);

  useEffect(() => {
    if (!socketData || !accountInfo) return;
    const updatedData = updateAccountInfo(accountInfo, socketData);
    setAccountInfo(updatedData);
  }, [socketData]);

  useEffect(() => {
    if (exchangeInfo) {
      const symbolFilters = getSymbolFilters(
        exchangeInfo,
        getSymbolFromState(symbol)
      );
      const { tickSize } = getSymbolPriceFilter(symbolFilters);
      const { stepSize } = getLotSizeFilter(symbolFilters);
      setTickSize(tickSize);
      setStepSize(stepSize);
    }
  }, [exchangeInfo, symbol]);

  const handleSetSymbol = useCallback(
    (newSymbol: SymbolState) => {
      const symbolPath = stringifySymbolFromToParam(newSymbol);
      const route = `${TERMINAL_ROUTE}/${symbolPath}`;
      updateUrl(route, { type: terminalType });
    },
    [terminalType]
  );

  const value = useMemo(
    () => ({
      tickSize,
      stepSize,
      authData,
      terminalType,
      userStream,
      setSymbol: handleSetSymbol,
      symbol,
      accountInfo,
      exchangeInfo
    }),
    [
      tickSize,
      stepSize,
      authData,
      terminalType,
      userStream,
      handleSetSymbol,
      symbol,
      accountInfo,
      exchangeInfo
    ]
  );

  return (
    <TerminalInfoContext.Provider value={value}>
      {children}
    </TerminalInfoContext.Provider>
  );
};
