import { useAlerts } from "hooks/alert.hook";
import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  Position,
  SymbolLeverageBrackets
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  FuturesAccountUpdateEvent,
  FuturesMarginCallEvent
} from "../../services/futures/binance-futures.types";
import { getSymbolFromState } from "../terminal.helpers";
import {
  filterFuturesAccountUpdateStream,
  filterMarginCallStream,
  flatNormalizedPositions,
  generateMarginCallMessage,
  normalizePositionsList,
  updatePositionsList
} from "../terminal-futures.helpers";

type TerminalFuturesPositionsContextState = {
  openPositions: Position[];
  allPositions: Position[];
  updatePositions: () => Promise<any>;
  updateSymbolPosition: () => Promise<any>;
  leverageBrackets?: SymbolLeverageBrackets[];
};

export const TerminalFuturesPositionsInitialState = {} as TerminalFuturesPositionsContextState;

export const TerminalFuturesPositionsContext = createContext<TerminalFuturesPositionsContextState>(
  TerminalFuturesPositionsInitialState
);

const ContextProvider: React.FC = ({ children }) => {
  const {
    getPositionInformation: getPositionInformationRequest,
    getLeverageBrackets: getLeverageBracketsRequest
  } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, $userStream, symbol } = useContext(
    TerminalInfoContext
  );
  const { warningAlert } = useAlerts();
  const [positionsList, setPositionsList] = useState<{
    [key: string]: Position;
  }>({});
  const [openPositions, setOpenPositions] = useState<Position[]>([]);
  const [socketAccountData, setAccountSocketData] = useState<
    FuturesAccountUpdateEvent | undefined
  >(undefined);
  const [socketMarginCallData, setMarginCallSocketData] = useState<
    FuturesMarginCallEvent | undefined
  >(undefined);

  const {
    sendRequest: getPositionSymbolInformation,
    data: positionSymbolInfoData
  } = useApiRequest({
    request: getPositionInformationRequest!
  });

  const {
    sendRequest: getPositionInformation,
    data: positionInfoData
  } = useApiRequest({
    request: getPositionInformationRequest!
  });

  const {
    sendRequest: getLeverageBrackets,
    data: leverageBrackets
  } = useApiRequest({
    request: getLeverageBracketsRequest!
  });

  const allPositions = useMemo(() => flatNormalizedPositions(positionsList), [
    positionsList
  ]);

  useEffect(() => {
    if (!exchangeAccountId || !$userStream) return;
    const accountStream = filterFuturesAccountUpdateStream($userStream);
    accountStream.subscribe(setAccountSocketData);
    const marginCallStream = filterMarginCallStream($userStream);
    marginCallStream.subscribe(setMarginCallSocketData);
  }, [exchangeAccountId, $userStream]);

  useEffect(() => {
    if (!socketMarginCallData) return;
    socketMarginCallData.positions.forEach(pos =>
      warningAlert(
        generateMarginCallMessage(pos, socketMarginCallData.crossWalletBalance)
      )
    );
  }, [socketMarginCallData]);

  useEffect(() => {
    if (!socketAccountData) return;
    const normalizedUpdatedPositions = normalizePositionsList(
      socketAccountData.positions
    );
    const updatedPositionList = updatePositionsList(
      positionsList,
      normalizedUpdatedPositions
    );
    setPositionsList(updatedPositionList);
  }, [socketAccountData]);

  useEffect(() => {
    if (getPositionInformationRequest && exchangeAccountId) {
      getPositionInformation({ accountId: exchangeAccountId });
    }
  }, [getPositionInformationRequest]);

  useEffect(() => {
    if (getLeverageBracketsRequest && exchangeAccountId)
      getLeverageBrackets({
        accountId: exchangeAccountId
      });
  }, [getLeverageBracketsRequest]);

  useEffect(() => {
    if (positionInfoData) {
      const positions = normalizePositionsList(positionInfoData);
      setPositionsList(positions);
    }
  }, [positionInfoData]);

  useEffect(() => {
    if (positionSymbolInfoData) {
      const positionsSymbol = normalizePositionsList(positionSymbolInfoData);
      const updatedPositionList = updatePositionsList(
        positionsList,
        positionsSymbol
      );
      setPositionsList(updatedPositionList);
    }
  }, [positionSymbolInfoData]);

  useEffect(() => {
    if (!allPositions.length) return;
    setOpenPositions(allPositions.filter(({ quantity }) => quantity !== 0));
  }, [allPositions]);

  const value = useMemo(
    () => ({
      openPositions,
      allPositions,
      leverageBrackets,
      updatePositions: () =>
        getPositionInformation({ accountId: exchangeAccountId }),
      updateSymbolPosition: () =>
        getPositionSymbolInformation({
          accountId: exchangeAccountId,
          symbol: getSymbolFromState(symbol)
        })
    }),
    [
      allPositions,
      openPositions,
      leverageBrackets,
      getPositionInformation,
      getPositionSymbolInformation,
      exchangeAccountId,
      symbol
    ]
  );

  return (
    <TerminalFuturesPositionsContext.Provider value={value}>
      {children}
    </TerminalFuturesPositionsContext.Provider>
  );
};

export const TerminalFuturesPositionsContextProvider: React.FC = ({
  children
}) => {
  const { terminalType } = useContext(TerminalInfoContext);

  return terminalType === "futures" ? (
    <ContextProvider>{children}</ContextProvider>
  ) : (
    <>{children}</>
  );
};
