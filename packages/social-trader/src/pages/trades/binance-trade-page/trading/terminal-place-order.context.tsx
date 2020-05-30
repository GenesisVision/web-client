import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { PositionModeType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const InitialTerminalLeverageState = 1;

type TradingAccountInfoState = {
  leverage: number;
  setLeverage: (leverage: number) => void;
  currentPositionMode?: PositionModeType;
  updatePositionMode: VoidFunction;
};

export const TerminalPlaceOrderInitialState: TradingAccountInfoState = {
  leverage: InitialTerminalLeverageState,
  setLeverage: () => {},
  updatePositionMode: () => {}
};

export const TerminalPlaceOrderContext = createContext<TradingAccountInfoState>(
  TerminalPlaceOrderInitialState
);

export const TerminalPlaceOrderContextProvider: React.FC = ({ children }) => {
  const { authData } = useContext(TradingInfoContext);
  const { getPositionMode } = useContext(TerminalMethodsContext);

  const [leverage, setLeverage] = useState(InitialTerminalLeverageState);
  const [currentPositionMode, setCurrentPositionMode] = useState<
    PositionModeType | undefined
  >();

  useEffect(() => {
    if (getPositionMode)
      getPositionMode({ authData }).then(setCurrentPositionMode);
  }, [getPositionMode]);

  const updatePositionMode = useCallback(() => {
    if (getPositionMode)
      getPositionMode({ authData }).then(setCurrentPositionMode);
  }, [getPositionMode, authData]);

  const value = useMemo(
    () => ({ leverage, setLeverage, updatePositionMode, currentPositionMode }),
    [leverage, setLeverage, updatePositionMode, currentPositionMode]
  );

  return (
    <TerminalPlaceOrderContext.Provider value={value}>
      {children}
    </TerminalPlaceOrderContext.Provider>
  );
};
