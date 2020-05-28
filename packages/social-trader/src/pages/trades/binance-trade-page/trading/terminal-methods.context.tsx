import { ITerminalMethods } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { createContext } from "react";

interface Props {
  methods: ITerminalMethods;
}

type TerminalMethodsContextState = ITerminalMethods;

export const TerminalMethodsInitialState = {} as TerminalMethodsContextState;

export const TerminalMethodsContext = createContext<
  TerminalMethodsContextState
>(TerminalMethodsInitialState);

export const TerminalMethodsContextProvider: React.FC<Props> = ({
  children,
  methods
}) => {
  return (
    <TerminalMethodsContext.Provider value={methods}>
      {children}
    </TerminalMethodsContext.Provider>
  );
};
