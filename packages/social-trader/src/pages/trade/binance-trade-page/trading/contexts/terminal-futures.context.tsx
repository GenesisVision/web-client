import { BinanceRawFuturesAccountAsset } from "gv-api-web";
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
  FullPosition,
  MarkPrice,
  MergedTickerSymbolType,
  Symbol,
  SymbolLeverageBrackets,
  Ticker
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { mergePositions } from "../terminal.helpers";

type TerminalFuturesContextState = {
  openPositions: FullPosition[];
  futureBalance?: BinanceRawFuturesAccountAsset;
  leverageBrackets?: SymbolLeverageBrackets[];
};

export const TerminalTickerInitialState = {} as TerminalFuturesContextState;

export const TerminalFuturesContext = createContext<TerminalFuturesContextState>(
  TerminalTickerInitialState
);

const ContextProvider: React.FC = ({ children }) => {
  const {
    getPositionInformation: getPositionInformationRequest,
    getLeverageBrackets: getLeverageBracketsRequest
  } = useContext(TerminalMethodsContext);

  const [positionsList, setPositionsList] = useState<{
    [key: string]: FullPosition;
  }>([]);

  const [openPositions, setOpenPositions] = useState([]);

  const [
    futureBalance,
    setFutureBalance
  ] = useState<BinanceRawFuturesAccountAsset>();

  const { exchangeAccountId, accountInfo } = useContext(TerminalInfoContext);

  const {
    sendRequest: getPositionInformation,
    data: positionInfoData
  } = useApiRequest({
    request: () =>
      getPositionInformationRequest!({ accountId: exchangeAccountId })
  });

  const {
    sendRequest: getLeverageBrackets,
    data: leverageBrackets
  } = useApiRequest({
    request: getLeverageBracketsRequest!
  });

  useEffect(() => {
    if (exchangeAccountId)
      getLeverageBrackets({
        accountId: exchangeAccountId
      });
  }, [exchangeAccountId]);

  useEffect(() => {
    if (!exchangeAccountId && !accountInfo) return;
    getPositionInformation();
  }, [exchangeAccountId]);

  useEffect(() => {
    if (!accountInfo || !positionInfoData) return;
    const positions = mergePositions(accountInfo.positions, positionInfoData);
    setPositionsList(positions);
  }, [accountInfo, positionInfoData]);

  useEffect(() => {
    if (!accountInfo) return;
    const usdtBalance = accountInfo.balances.find(
      balance => balance.asset === "USDT"
    );
    setFutureBalance(usdtBalance);
  }, [accountInfo?.balances]);

  useEffect(() => {
    if (!positionsList) return;
    setOpenPositions(positionsList.filter(pos => pos.quantity !== 0));
  }, [positionsList]);

  const value = useMemo(
    () => ({ openPositions, futureBalance, leverageBrackets }),
    [positionsList, futureBalance, openPositions, leverageBrackets]
  );

  return (
    <TerminalFuturesContext.Provider value={value}>
      {children}
    </TerminalFuturesContext.Provider>
  );
};

export const TerminalFuturesContextProvider: React.FC = ({ children }) => {
  const { terminalType } = useContext(TerminalInfoContext);

  return terminalType === "futures" ? (
    <ContextProvider>{children}</ContextProvider>
  ) : (
    <>{children}</>
  );
};
