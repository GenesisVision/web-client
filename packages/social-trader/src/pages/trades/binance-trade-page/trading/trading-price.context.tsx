import React, { createContext, useMemo, useState } from "react";

type TradingPriceState = {
  setPrice: (price: string) => void;
  price: string;
};

const PriceInitialState: string = "0";

export const TradingAccountInfoInitialState: TradingPriceState = {
  setPrice: () => {},
  price: PriceInitialState
};

export const TradingPriceContext = createContext<TradingPriceState>(
  TradingAccountInfoInitialState
);

export const TradingPriceContextProvider: React.FC = ({ children }) => {
  const [price, setPrice] = useState<string>(PriceInitialState);
  const value = useMemo(
    () => ({
      setPrice,
      price
    }),
    [setPrice, price]
  );

  return (
    <TradingPriceContext.Provider value={value}>
      {children}
    </TradingPriceContext.Provider>
  );
};
