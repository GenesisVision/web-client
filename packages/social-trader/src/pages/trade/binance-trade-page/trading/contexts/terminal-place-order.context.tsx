import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  FuturesPositionInformation,
  LeverageBracket,
  MarginModeType,
  PositionModeType,
  PositionSideType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { getPositionInfo } from "../place-order/place-order.helpers";
import { FuturesPlaceOrderMode } from "../place-order/place-order.types";
import { getSymbolFromState } from "../terminal.helpers";

const InitialSpotTerminalLeverageState = 1;
const InitialFuturesTerminalLeverageState = 20;

type TradingAccountInfoState = {
  setBracket: (bracket?: LeverageBracket) => void;
  leverage: number;
  setLeverage: (leverage: number) => void;
  currentPositionMode?: PositionModeType;
  updatePositionMode: VoidFunction;
  bracket?: LeverageBracket;
  positionInfo?: FuturesPositionInformation;
  marginMode?: MarginModeType;
  setMarginMode?: (mode: MarginModeType) => void;
  setPositionSide?: (position: PositionSideType) => void;
  placeOrderMode?: FuturesPlaceOrderMode;
  setPlaceOrderMode?: (mode: FuturesPlaceOrderMode) => void;
};

export const TerminalPlaceOrderInitialState: TradingAccountInfoState = {
  leverage: InitialSpotTerminalLeverageState,
  setBracket: () => {},
  setLeverage: () => {},
  updatePositionMode: () => {}
};

export const TerminalPlaceOrderContext = createContext<TradingAccountInfoState>(
  TerminalPlaceOrderInitialState
);

export const TerminalPlaceOrderContextProvider: React.FC = ({ children }) => {
  const { terminalType, exchangeAccountId, symbol } = useContext(
    TerminalInfoContext
  );
  const { getPositionMode, getPositionInformation } = useContext(
    TerminalMethodsContext
  );

  const [marginMode, setMarginMode] = useState<MarginModeType | undefined>();

  const [bracket, setBracket] = useState<LeverageBracket | undefined>();
  const [leverage, setLeverage] = useState(
    terminalType === "futures"
      ? InitialFuturesTerminalLeverageState
      : InitialSpotTerminalLeverageState
  );
  const [currentPositionMode, setCurrentPositionMode] = useState<
    PositionModeType | undefined
  >();

  const [positionInfoArray, setPositionInfoArray] = useState<
    FuturesPositionInformation[] | undefined
  >();

  const [positionInfo, setPositionInfo] = useState<
    FuturesPositionInformation | undefined
  >();
  // setPositionSide добавить в попап изменения режима позиции
  const [positionSide, setPositionSide] = useState<
    PositionSideType | undefined
  >(undefined);

  const [placeOrderMode, setPlaceOrderMode] = useState<FuturesPlaceOrderMode>(
    currentPositionMode === "Hedge" ? "HedgeOpen" : "OneWay"
  );

  useEffect(() => {
    if (currentPositionMode === "Hedge") {
      setPlaceOrderMode("HedgeOpen");
    } else {
      setPlaceOrderMode("OneWay");
    }
  }, [currentPositionMode]);

  useEffect(() => {
    if (positionInfo) {
      setLeverage(positionInfo.leverage);
      return;
    }
    setLeverage(
      terminalType === "futures"
        ? InitialFuturesTerminalLeverageState
        : InitialSpotTerminalLeverageState
    );
  }, [terminalType, positionInfo]);

  useEffect(() => {
    if (getPositionMode && exchangeAccountId)
      getPositionMode(exchangeAccountId).then(setCurrentPositionMode);
  }, [getPositionMode]);

  useEffect(() => {
    // THIS IS ENDPOINT FOR ALL POSITIONS FIX IT !!!
    if (getPositionInformation && exchangeAccountId && currentPositionMode)
      getPositionInformation({
        symbol: getSymbolFromState(symbol),
        accountId: exchangeAccountId
      }).then(setPositionInfoArray);
  }, [getPositionInformation, currentPositionMode, symbol]);

  useEffect(() => {
    if (positionInfoArray) {
      setPositionInfo(getPositionInfo(positionInfoArray, positionSide));
    }
  }, [positionInfoArray, positionSide, currentPositionMode]);

  useEffect(() => {
    if (positionInfo) {
      setMarginMode(positionInfo.marginType);
    }
  }, [positionInfo]);

  const updatePositionMode = useCallback(() => {
    if (getPositionMode && exchangeAccountId)
      getPositionMode(exchangeAccountId).then(setCurrentPositionMode);
  }, [getPositionMode, exchangeAccountId]);

  const value = useMemo(
    () => ({
      positionInfo,
      setPositionSide,
      bracket,
      setBracket,
      leverage,
      marginMode,
      setMarginMode,
      setLeverage,
      updatePositionMode,
      currentPositionMode,
      placeOrderMode,
      setPlaceOrderMode
    }),
    [
      positionInfo,
      setPositionSide,
      bracket,
      setBracket,
      marginMode,
      leverage,
      setMarginMode,
      setLeverage,
      updatePositionMode,
      currentPositionMode,
      placeOrderMode,
      setPlaceOrderMode
    ]
  );

  return (
    <TerminalPlaceOrderContext.Provider value={value}>
      {children}
    </TerminalPlaceOrderContext.Provider>
  );
};
