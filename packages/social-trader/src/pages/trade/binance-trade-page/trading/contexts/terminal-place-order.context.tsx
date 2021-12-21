import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
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
  const { allPositions } = useContext(TerminalFuturesPositionsContext);

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
      setLeverage(positionInfo.leverage);
      setMarginMode(positionInfo.marginType);
    }
  }, [positionInfo, symbol]);

  useEffect(() => {
    if (!allPositions.length) return;
    // if currentMode is hedge, then you have two position for symbol. You can choose any position, because leverage and marginType will be the same

    // Sometimes in sockets you can get extra positions (for example in funding fee messages).
    // It means that you have three positions and one or two of them does not have enough data, because it wasn't loaded from restApi
    // It might lacks of leverage that's why i check in array whether it has leverage or not
    const currentPosition = allPositions.find(
      pos => pos.symbol === getSymbolFromState(symbol) && pos.leverage
    );
    setPositionInfo(currentPosition);
  }, [allPositions, symbol]);

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
