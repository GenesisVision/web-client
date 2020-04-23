import { useCookieState } from "hooks/cookie-state";
import { useEffect, useState } from "react";

export type TradeAuthDataType = { publicKey: string; privateKey: string };

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
