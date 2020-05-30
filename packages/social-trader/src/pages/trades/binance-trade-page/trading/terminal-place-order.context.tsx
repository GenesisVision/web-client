import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  LeverageBracket,
  PositionModeType
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const InitialSpotTerminalLeverageState = 1;
const InitialFuturesTerminalLeverageState = 20;

type TradingAccountInfoState = {
  bracket?: LeverageBracket;
  setBracket: (bracket?: LeverageBracket) => void;
  leverage: number;
  setLeverage: (leverage: number) => void;
  currentPositionMode?: PositionModeType;
  updatePositionMode: VoidFunction;
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
  const { authData, terminalType } = useContext(TradingInfoContext);
  const { getPositionMode } = useContext(TerminalMethodsContext);

  const [bracket, setBracket] = useState<LeverageBracket | undefined>();
  const [leverage, setLeverage] = useState(
    terminalType === "futures"
      ? InitialFuturesTerminalLeverageState
      : InitialSpotTerminalLeverageState
  );
  const [currentPositionMode, setCurrentPositionMode] = useState<
    PositionModeType | undefined
  >();

  useEffect(() => {
    setLeverage(
      terminalType === "futures"
        ? InitialFuturesTerminalLeverageState
        : InitialSpotTerminalLeverageState
    );
  }, [terminalType]);

  useEffect(() => {
    if (getPositionMode)
      getPositionMode({ authData }).then(setCurrentPositionMode);
  }, [getPositionMode]);

  const updatePositionMode = useCallback(() => {
    if (getPositionMode)
      getPositionMode({ authData }).then(setCurrentPositionMode);
  }, [getPositionMode, authData]);

  const value = useMemo(
    () => ({
      bracket,
      setBracket,
      leverage,
      setLeverage,
      updatePositionMode,
      currentPositionMode
    }),
    [
      bracket,
      setBracket,
      leverage,
      setLeverage,
      updatePositionMode,
      currentPositionMode
    ]
  );

  return (
    <TerminalPlaceOrderContext.Provider value={value}>
      {children}
    </TerminalPlaceOrderContext.Provider>
  );
};
