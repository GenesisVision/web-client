import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  LeverageBracket,
  MarginModeType,
  Position,
  PositionModeType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { FuturesPlaceOrderMode } from "../place-order/place-order.types";
import { getSymbolFromState } from "../terminal.helpers";
import { flatNormalizedPositions } from "../terminal-futures.helpers";
import { TerminalFuturesPositionsContext } from "./terminal-futures-positions.context";

const InitialFuturesTerminalLeverageState = 1;

type TradingAccountInfoState = {
  leverage: number;
  setLeverage: (leverage: number) => void;
  updatePositionMode: VoidFunction;
  setMarginMode: (mode: MarginModeType) => void;
  placeOrderMode: FuturesPlaceOrderMode;
  setPlaceOrderMode: (mode: FuturesPlaceOrderMode) => void;
  currentPositionMode?: PositionModeType;
  maxNotional: number;
  marginMode?: MarginModeType;
  positionInfo?: Position;
};

export const TerminalPlaceOrderInitialState = {} as TradingAccountInfoState;

export const TerminalPlaceOrderContext = createContext<TradingAccountInfoState>(
  TerminalPlaceOrderInitialState
);

const ContextProvider: React.FC = ({ children }) => {
  const { exchangeAccountId, symbol } = useContext(TerminalInfoContext);
  const { getPositionMode } = useContext(TerminalMethodsContext);
  const { positionsList } = useContext(TerminalFuturesPositionsContext);

  const [marginMode, setMarginMode] = useState<MarginModeType | undefined>();
  const [leverage, setLeverage] = useState(InitialFuturesTerminalLeverageState);
  const [maxNotional, setMaxNotional] = useState<number>(0);
  const [currentPositionMode, setCurrentPositionMode] = useState<
    PositionModeType | undefined
  >();
  const [placeOrderMode, setPlaceOrderMode] = useState<FuturesPlaceOrderMode>(
    "OneWay"
  );
  const [positionInfo, setPositionInfo] = useState<Position | undefined>();

  useEffect(() => {
    if (currentPositionMode === "Hedge") {
      setPlaceOrderMode("HedgeOpen");
    } else {
      setPlaceOrderMode("OneWay");
    }
  }, [currentPositionMode]);

  useEffect(() => {
    if (positionInfo) {
      setMaxNotional(positionInfo.maxNotional);
    }
  }, [positionInfo, symbol]);

  useEffect(() => {
    if (positionInfo) {
      setLeverage(positionInfo.leverage);
    }
  }, [positionInfo, symbol]);

  useEffect(() => {
    if (positionInfo) {
      setMarginMode(positionInfo.marginType);
    }
  }, [positionInfo, symbol]);

  useEffect(() => {
    if (positionsList) {
      const flatPositions = flatNormalizedPositions(positionsList).filter(
        pos => pos.symbol === getSymbolFromState(symbol)
      );
      // if currentMode is hedge, then you have two position for symbol. You can choose any position, because leverage and marginType will be the same
      setPositionInfo(flatPositions[0]);
    }
  }, [positionsList, symbol]);

  useEffect(() => {
    if (getPositionMode && exchangeAccountId)
      getPositionMode(exchangeAccountId).then(setCurrentPositionMode);
  }, [getPositionMode]);

  const updatePositionMode = useCallback(() => {
    if (getPositionMode && exchangeAccountId)
      getPositionMode(exchangeAccountId).then(setCurrentPositionMode);
  }, [getPositionMode, exchangeAccountId]);

  const value = useMemo(
    () => ({
      leverage,
      marginMode,
      setMarginMode,
      setLeverage,
      updatePositionMode,
      currentPositionMode,
      placeOrderMode,
      setPlaceOrderMode,
      positionInfo,
      maxNotional
    }),
    [
      marginMode,
      leverage,
      setMarginMode,
      setLeverage,
      updatePositionMode,
      currentPositionMode,
      placeOrderMode,
      setPlaceOrderMode,
      positionInfo,
      maxNotional
    ]
  );

  return (
    <TerminalPlaceOrderContext.Provider value={value}>
      {children}
    </TerminalPlaceOrderContext.Provider>
  );
};

export const TerminalPlaceOrderContextProvider: React.FC = ({ children }) => {
  const { terminalType } = useContext(TerminalInfoContext);

  return terminalType === "futures" ? (
    <ContextProvider>{children}</ContextProvider>
  ) : (
    <>{children}</>
  );
};
