import {
  Depth,
  Ticker,
  Trade,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConnectSocketMethodType } from "services/websocket.service";

import {
  depthTransform,
  tickerTransform,
  tradeTransform,
  transformExecutionReport,
  transformOutboundAccountInfo
} from "../binance-ws.helpers";

export const BINANCE_FUTURES_WS_API_URL = "wss://fstream.binance.com";

export enum BINANCE_WS_API_TYPE {
  WS = "ws",
  STREAM = "stream"
}

export enum ORDER_STATUSES {
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
  FILLED = "FILLED",
  NEW = "NEW",
  FAIL = "FAIL",
  PENDING = "PENDING",
  REJECTED = "REJECTED"
}

export const tradeSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TradeCurrency
): Observable<Trade> => {
  const socketType = "trade";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(map(tradeTransform));
};

export const depthSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TradeCurrency
): Observable<Depth> => {
  const socketType = "depth";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(map(depthTransform));
};

export const marketTicketsSocket = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<Ticker[]> => {
  const socketType = "arr";
  const socketName = `!ticker@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(
    map(items => items.map(tickerTransform))
  );
};

export const getUserStreamSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  listenKey: string
) => {
  const socketName = "accountInformation";
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${listenKey}`;
  return connectSocketMethod(socketName, url).pipe(
    map(item => {
      if (item.e === "outboundAccountInfo")
        return transformOutboundAccountInfo(item);
      if (item.e === "executionReport") return transformExecutionReport(item);
      return item;
    })
  );
};
