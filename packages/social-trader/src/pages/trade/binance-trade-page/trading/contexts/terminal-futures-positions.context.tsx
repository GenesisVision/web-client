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

import { FuturesAccountUpdateEvent } from "../../services/futures/binance-futures.types";
import {
  filterAccountUpdateStream,
  flatNormalizedPositions,
  getSymbolFromState,
  normalizePositionsList,
  updatePositionList
} from "../terminal.helpers";

type TerminalFuturesPositionsContextState = {
  openPositions: Position[];
  positionsList: { [key: string]: Position };
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
  const [positionsList, setPositionsList] = useState<{
    [key: string]: Position;
  }>({});
  const [openPositions, setOpenPositions] = useState<Position[]>([]);
  const [socketData, setSocketData] = useState<
    FuturesAccountUpdateEvent | undefined
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
    request: getPositionInformationRequest
      ? getPositionInformationRequest
      : () => {}
  });

  const {
    sendRequest: getLeverageBrackets,
    data: leverageBrackets
  } = useApiRequest({
    request: getLeverageBracketsRequest ? getLeverageBracketsRequest : () => {}
  });

  useEffect(() => {
    if (!exchangeAccountId || !$userStream) return;
    const accountStream = filterAccountUpdateStream($userStream);
    accountStream.subscribe(setSocketData);
  }, [exchangeAccountId, $userStream]);

  useEffect(() => {
    if (!socketData) return;
    const normalizedUpdatedPositions = normalizePositionsList(
      socketData.positions
    );
    const updatedPositionList = updatePositionList(
      positionsList,
      normalizedUpdatedPositions
    );
    setPositionsList(updatedPositionList);
  }, [socketData]);

  useEffect(() => {
    if (getPositionInformation && exchangeAccountId) {
      getPositionInformation({ accountId: exchangeAccountId });
    }
  }, [exchangeAccountId]);

  useEffect(() => {
    if (getLeverageBrackets && exchangeAccountId)
      getLeverageBrackets({
        accountId: exchangeAccountId
      });
  }, [exchangeAccountId]);

  useEffect(() => {
    if (positionInfoData) {
      const positions = normalizePositionsList(positionInfoData);
      setPositionsList(positions);
    }
  }, [positionInfoData]);

  useEffect(() => {
    if (positionSymbolInfoData) {
      const positionsSymbol = normalizePositionsList(positionSymbolInfoData);
      const updatedPositionList = updatePositionList(
        positionsList,
        positionsSymbol
      );
      setPositionsList(updatedPositionList);
    }
  }, [positionSymbolInfoData]);

  useEffect(() => {
    if (!positionsList) return;
    const flatPositions = flatNormalizedPositions(positionsList);
    setOpenPositions(flatPositions.filter(({ quantity }) => quantity !== 0));
  }, [positionsList]);

  const value = useMemo(
    () => ({
      openPositions,
      positionsList,
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
      positionsList,
      openPositions,
      leverageBrackets,
      getPositionInformation,
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
