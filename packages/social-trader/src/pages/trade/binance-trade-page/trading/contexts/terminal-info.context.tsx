import { useAccountCurrency } from "hooks/account-currency.hook";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  filterOutboundAccountInfoStream,
  getSymbolFilters,
  getSymbolFromState,
  stringifySymbolFromToParam,
  updateAccountInfo,
  useUpdateTerminalUrlParams
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  Account,
  ExchangeInfo,
  TerminalAuthDataType,
  TerminalCurrency,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Observable } from "rxjs";
import { useSockets } from "services/websocket.service";

interface Props {
  exchangeAccountId?: string;
  exchangeInfo: ExchangeInfo;
  authData?: TerminalAuthDataType;
  outerSymbol?: SymbolState;
  terminalType: TerminalType;
}

export type SymbolState = {
  quoteAsset: TerminalCurrency;
  baseAsset: TerminalCurrency;
};

type TerminalAccountInfoState = {
  exchangeAccountId?: string;
  stepSize: string;
  tickSize: string;
  authData?: TerminalAuthDataType;
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
  terminalType: TerminalTypeInitialState,
  setSymbol: () => {},
  symbol: SymbolInitialState
};

export const TerminalInfoContext = createContext<TerminalAccountInfoState>(
  TerminalAccountInfoInitialState
);

export const TerminalInfoContextProvider: React.FC<Props> = ({
  exchangeAccountId,
  exchangeInfo,
  authData,
  outerSymbol = SymbolInitialState,
  terminalType,
  children
}) => {
  const currency = useAccountCurrency();
  const { updateUrl } = useUpdateTerminalUrlParams();

  const {
    getAccountInformation,
    getUserStreamKey,
    getUserStreamSocket
  } = useContext(TerminalMethodsContext);
  const { connectSocket } = useSockets();

  const [symbol, setSymbol] = useState<SymbolState>(outerSymbol);
  const [tickSize, setTickSize] = useState<string>("0.01");
  const [stepSize, setStepSize] = useState<string>("0.01");
  const [userStreamKey, setUserStreamKey] = useState<string | undefined>();
  const [userStream, setUserStream] = useState<Observable<any> | undefined>();
  const [accountInfo, setAccountInfo] = useState<Account | undefined>();
  const [socketData, setSocketData] = useState<Account | undefined>(undefined);

  useEffect(() => {
    if (!exchangeAccountId) return;
    const accountInfo = getAccountInformation(exchangeAccountId, currency);
    accountInfo.subscribe(data => {
      setAccountInfo(data);
    });
    getUserStreamKey(exchangeAccountId).subscribe(({ listenKey }) =>
      setUserStreamKey(listenKey)
    );
  }, [getAccountInformation, getUserStreamKey]);

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
      const { tickSize } = symbolFilters.priceFilter;
      const { stepSize } = symbolFilters.lotSizeFilter;
      setTickSize(String(tickSize));
      setStepSize(String(stepSize));
    }
  }, [exchangeInfo, symbol]);

  const handleSetSymbol = useCallback(
    (newSymbol: SymbolState) => {
      const symbolPath = stringifySymbolFromToParam(newSymbol);
      setSymbol(newSymbol);
      updateUrl({ url: symbolPath, updates: { type: terminalType } });
    },
    [terminalType, updateUrl]
  );
  const value = useMemo(
    () => ({
      exchangeAccountId,
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
      exchangeAccountId,
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
