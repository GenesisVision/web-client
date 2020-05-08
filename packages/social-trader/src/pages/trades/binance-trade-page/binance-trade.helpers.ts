import { useCookieState } from "hooks/cookie-state";
import { TradeAuthDataType } from "pages/trades/binance-trade-page/trading/trading.types";
import { useEffect, useState } from "react";

const TRADE_AUTH_DATA_KEY = "TRADE_AUTH_DATA_KEY";
const initialState = { publicKey: "", privateKey: "" };

export const useTradeAuth = () => {
  const [authData, setAuthData] = useState(initialState);
  const { set, get } = useCookieState({
    key: TRADE_AUTH_DATA_KEY,
    initialState
  });
  useEffect(() => {
    setAuthData(get());
  }, []);
  return {
    set: (values: TradeAuthDataType) => {
      setAuthData(values);
      set(values);
    },
    authData
  };
};
