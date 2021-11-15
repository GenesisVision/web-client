import {
  futuresAccountUpdateEventTransform,
  futuresEventTradeOrderTransform,
  futuresMarginCallEventTransform,
  transformFuturesTickerSymbolWS,
  transformMarkPriceWS
} from "pages/trade/binance-trade-page/services/futures/binance-futures.helpers";
import {
  Depth,
  IBinanceKline,
  IKline,
  KlineSocketType,
  MarkPrice,
  TerminalCurrency,
  Ticker,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConnectSocketMethodType } from "services/websocket.service";

import {
  depthTransform,
  tradeTransform,
  transformKlineWs
} from "../spot/binance-spot-ws.helpers";
import { FUTURES_ACCOUNT_EVENT } from "./binance-futures.types";

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

export const markPricesSocket = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<MarkPrice[]> => {
  // Update Speed: 3000ms or 1000ms
  const updateSpeed = "@3s";
  const socketType = "arr";
  const socketName = `!markPrice@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}${updateSpeed}`;
  return connectSocketMethod(socketType, url).pipe(
    map(items => items.map(transformMarkPriceWS))
  );
};

export const tradeSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TerminalCurrency
): Observable<UnitedTrade> => {
  // Update Speed: 100ms
  const socketType = "aggTrade";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(map(tradeTransform));
};

export const depthSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TerminalCurrency,
  openCallback?: VoidFunction
): Observable<Depth> => {
  // Update Speed: 250ms, 500ms, 100ms
  const updateSpeed = "@500ms";
  const socketType = "depth";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}${updateSpeed}`;
  return connectSocketMethod(socketType, url, openCallback).pipe(
    map(depthTransform)
  );
};

export const marketTicketsSocket = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<Ticker[]> => {
  // Update Speed: 1000ms
  const socketType = "arr";
  const socketName = `!ticker@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(
    map(items => items.map(transformFuturesTickerSymbolWS))
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
      if (item.e === FUTURES_ACCOUNT_EVENT.marginCall)
        return futuresMarginCallEventTransform(item);
      if (item.e === FUTURES_ACCOUNT_EVENT.accountUpdate)
        return futuresAccountUpdateEventTransform(item);
      if (item.e === FUTURES_ACCOUNT_EVENT.orderTradeUpdate)
        return futuresEventTradeOrderTransform(item.o);
      return item;
    })
  );
};

export const klineSocket = (
  connectSocketMethod: ConnectSocketMethodType
): KlineSocketType => (symbol: string, interval: string) => {
  // Update Speed: 250ms
  const socketName = `${symbol}@kline_${interval}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketName, url).pipe(
    map<IBinanceKline, IKline>(transformKlineWs)
  );
};
