import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { Ticker } from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { getUserStreamKey } from "./binance-http.service";
import { tickerTransform } from "./binance-ws.helpers";
import { ConnectSocketMethodType } from "services/websocket.service";

export const BINANCE_WS_API_URL = "wss://stream.binance.com:9443";

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

export const marketTicketsSocket = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<Ticker[]> => {
  const socketName = "!ticker@arr";
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketName, url).pipe(
    map(items => items.map(tickerTransform))
  );
};

export const getAccountInformationSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
) => {
  const socketName = "accountInformation";
  return getUserStreamKey(authData).pipe(
    switchMap((key: any) => {
      const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${key.listenKey}`;
      return connectSocketMethod(socketName, url).pipe(
        filter(info => info.e === "outboundAccountInfo"),
        map(info => {
          return { ...info, balances: info.B };
        })
      );
    })
  );
};

export const getOpenOrdersSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
) => {
  const socketName = "accountInformation";
  return getUserStreamKey(authData).pipe(
    switchMap((key: any) => {
      const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${key.listenKey}`;
      return connectSocketMethod(socketName, url).pipe(
        filter(info => info.e === "executionReport"),
        filter(
          item =>
            item.X !== ORDER_STATUSES.FILLED &&
            item.X !== ORDER_STATUSES.PARTIALLY_FILLED &&
            item.X !== ORDER_STATUSES.REJECTED
        )
      );
    })
  );
};

export const getAllOrdersSocket = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
) => {
  const socketName = "accountInformation";
  return getUserStreamKey(authData).pipe(
    switchMap((key: any) => {
      const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${key.listenKey}`;
      return connectSocketMethod(socketName, url).pipe(
        filter(info => info.e === "executionReport"),
        filter(
          item =>
            item.X === ORDER_STATUSES.FILLED ||
            item.X === ORDER_STATUSES.PARTIALLY_FILLED
        ),
        filter(info => info.s === symbol.toUpperCase())
      );
    })
  );
};
