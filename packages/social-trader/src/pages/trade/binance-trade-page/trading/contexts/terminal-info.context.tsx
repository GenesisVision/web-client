import { Push } from "components/link/link";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import { useAuth } from "hooks/auth.hook";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  filterOutboundAccountInfoStream,
  getSymbolFilters,
  getSymbolFromState,
  getTickSizeFromPrecision,
  stringifySymbolFromToParam,
  updateAccountInfo,
  useUpdateTerminalUrlParams
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  Account,
  ExchangeInfo,
  SymbolState,
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
import { LOGIN_ROUTE } from "routes/app.routes";
import { Observable } from "rxjs";
import { useSockets } from "services/websocket.service";

import { DEFAULT_DEPTH_TICK_SIZE } from "../order-book/order-book.helpers";

interface Props {
  exchangeAccountId?: string;
  exchangeInfo: ExchangeInfo;
  outerSymbol?: SymbolState;
  terminalType: TerminalType;
}

type TerminalAccountInfoState = {
  exchangeAccountId?: string;
  stepSize: string;
  tickSize: string;
  terminalType: TerminalType;
  userStream?: Observable<any>;
  setSymbol: (symbol: SymbolState) => void;
  symbol: SymbolState;
  depthTickSize?: string;
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
  outerSymbol = SymbolInitialState,
  terminalType,
  children
}) => {
  const currency = useAccountCurrency();
  const { updateUrl } = useUpdateTerminalUrlParams();

  const {
    getAccountInformation: getAccountInformationRequest,
    getUserStreamKey,
    getUserStreamSocket
  } = useContext(TerminalMethodsContext);
  const { connectSocket } = useSockets();

  const { isAuthenticated } = useAuth();

  const [symbol, setSymbol] = useState<SymbolState>(outerSymbol);
  const [tickSize, setTickSize] = useState<string>("0.01");
  const [stepSize, setStepSize] = useState<string>("0.01");
  const [depthTickSize, setDepthTickSize] = useState<string>(
    DEFAULT_DEPTH_TICK_SIZE
  );
  const [userStreamKey, setUserStreamKey] = useState<string | undefined>();
  const [userStream, setUserStream] = useState<Observable<any> | undefined>();
  const [socketData, setSocketData] = useState<Account | undefined>(undefined);

  const {
    sendRequest: getAccountInformation,
    data: accountInfo,
    setData: setAccountInfo
  } = useApiRequest({
    name: "getAccountInformation",
    cache: true,
    catchCallback: () => {
      if (!isAuthenticated) Push(LOGIN_ROUTE);
    },
    request: ({ exchangeAccountId, currency }) =>
      getAccountInformationRequest(exchangeAccountId, currency)
  });

  useEffect(() => {
    if (!exchangeAccountId) return;
    getAccountInformation({ exchangeAccountId, currency });
    getUserStreamKey(exchangeAccountId).subscribe(({ listenKey }) =>
      setUserStreamKey(listenKey)
    );
  }, [getAccountInformationRequest, getUserStreamKey]);

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
      if (symbolFilters.pricePrecision) {
        setDepthTickSize(
          getTickSizeFromPrecision(symbolFilters.pricePrecision)
        );
      }
    }
  }, [exchangeInfo, symbol]);

  const handleSetSymbol = useCallback(
    (newSymbol: SymbolState) => {
      const symbolPath = stringifySymbolFromToParam(newSymbol);
      setSymbol(newSymbol);
      updateUrl({ url: symbolPath });
    },
    [updateUrl]
  );
  const value = useMemo(
    () => ({
      exchangeAccountId,
      tickSize,
      stepSize,
      depthTickSize,
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
      depthTickSize,
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
