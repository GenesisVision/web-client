import useApiRequest from "hooks/api-request.hook";
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
} from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  Account,
  ExchangeInfo,
  TerminalType,
  TradeAuthDataType,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
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
  authData: TradeAuthDataType;
  outerSymbol?: SymbolState;
  type?: TerminalType;
}

export type SymbolState = {
  quoteAsset: TradeCurrency;
  baseAsset: TradeCurrency;
};

type TradingAccountInfoState = {
  isCorrectSymbol?: boolean;
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

export const SymbolInitialState: SymbolState = {
  quoteAsset: "USDT",
  baseAsset: "BTC"
};

export const TradingAccountInfoInitialState: TradingAccountInfoState = {
  stepSize: "0.01",
  tickSize: "0.01",
  authData: {
    publicKey: "",
    privateKey: ""
  },
  terminalType: "spot",
  setSymbol: () => {},
  symbol: SymbolInitialState
};

export const TradingInfoContext = createContext<TradingAccountInfoState>(
  TradingAccountInfoInitialState
);

export const TradingInfoContextProvider: React.FC<Props> = ({
  // exchangeInfo,
  authData: authDataProp,
  outerSymbol: symbol = SymbolInitialState,
  type,
  children
}) => {
  const updateUrl = useUpdateTerminalUrlParams();
  const [isCorrectSymbol, setSymbolCorrect] = useState<boolean | undefined>();
  const [terminalType, setTerminalType] = useState<TerminalType>(
    type || "spot"
  );
  const {
    getExchangeInfo,
    getAccountInformation,
    getUserStreamKey,
    getUserStreamSocket
  } = useContext(TerminalMethodsContext);
  const [authData] = useState<TradeAuthDataType>(authDataProp);
  const { connectSocket } = useSockets();

  const { sendRequest, data: exchangeInfo } = useApiRequest<ExchangeInfo>({
    request: getExchangeInfo
  });

  const [tickSize, setTickSize] = useState<string>("0.01");
  const [stepSize, setStepSize] = useState<string>("0.01");
  const [userStreamKey, setUserStreamKey] = useState<string | undefined>();
  const [userStream, setUserStream] = useState<Observable<any> | undefined>();
  const [accountInfo, setAccountInfo] = useState<Account | undefined>();
  const [socketData, setSocketData] = useState<Account | undefined>(undefined);

  useEffect(() => {
    setSymbolCorrect(undefined);
  }, [getExchangeInfo, symbol]);

  useEffect(() => {
    if (!exchangeInfo) return;
    const isCorrect = !!exchangeInfo.symbols.find(
      item => item.symbol === getSymbolFromState(symbol)
    );
    setSymbolCorrect(isCorrect);
  }, [isCorrectSymbol, exchangeInfo, symbol]);

  useEffect(() => {
    sendRequest();
  }, [getExchangeInfo]);

  useEffect(() => {
    if (type) setTerminalType(type);
  }, [type]);

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
    [updateUrl, terminalType]
  );

  useEffect(() => {
    if (isCorrectSymbol === false) handleSetSymbol(SymbolInitialState);
  }, [isCorrectSymbol, handleSetSymbol]);

  const value = useMemo(
    () => ({
      isCorrectSymbol,
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
      isCorrectSymbol,
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
    <TradingInfoContext.Provider value={value}>
      {children}
    </TradingInfoContext.Provider>
  );
};
