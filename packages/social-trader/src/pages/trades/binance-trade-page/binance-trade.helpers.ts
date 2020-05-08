import { useCookieState } from "hooks/cookie-state";
import {
  cancelAllOrders,
  cancelOrder,
  getAccountInformation,
  getAllOrders,
  getDepth,
  getExchangeInfo,
  getOpenOrders,
  getTickers,
  getTrades,
  getUserStreamKey,
  tradeRequest
} from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import {
  depthSocket,
  getUserStreamSocket,
  marketTicketsSocket,
  tradeSocket
} from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import {
  ITerminalMethods,
  TradeAuthDataType
} from "pages/trades/binance-trade-page/trading/trading.types";
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

export const BinanceTerminalMethods: ITerminalMethods = {
  getExchangeInfo,
  getOpenOrders,
  getAllOrders,
  getUserStreamKey,
  getAccountInformation,
  getTrades,
  getTickers,
  getDepth,
  cancelAllOrders,
  cancelOrder,
  tradeRequest,
  tradeSocket,
  depthSocket,
  marketTicketsSocket,
  getUserStreamSocket
};
