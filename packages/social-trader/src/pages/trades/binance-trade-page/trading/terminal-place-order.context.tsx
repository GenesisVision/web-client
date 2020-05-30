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

type TradingAccountInfoState = {
  currentPositionMode?: PositionModeType;
  updatePositionMode: VoidFunction;
};

export const TerminalPlaceOrderInitialState: TradingAccountInfoState = {
  updatePositionMode: () => {}
};

export const TerminalPlaceOrderContext = createContext<TradingAccountInfoState>(
  TerminalPlaceOrderInitialState
);

export const TerminalPlaceOrderContextProvider: React.FC = ({ children }) => {
  const { authData } = useContext(TradingInfoContext);
  const { getPositionMode } = useContext(TerminalMethodsContext);

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

  const value = useMemo(() => ({ updatePositionMode, currentPositionMode }), [
    updatePositionMode,
    currentPositionMode
  ]);

  return (
    <TerminalPlaceOrderContext.Provider value={value}>
      {children}
    </TerminalPlaceOrderContext.Provider>
  );
};
