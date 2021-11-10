import {
  futuresAccountUpdateEventTransform,
  futuresEventTradeOrderTransform,
  futuresMarginCallEventTransform,
  futuresTradeOrderUpdateEventTransform,
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
  const socketType = "arr";
  const socketName = `!markPrice@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(
    map(items => items.map(transformMarkPriceWS))
  );
};

export const tradeSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TerminalCurrency
): Observable<UnitedTrade> => {
  const socketType = "trade";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketType, url).pipe(map(tradeTransform));
};

export const depthSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TerminalCurrency,
  openCallback?: VoidFunction
): Observable<Depth> => {
  const socketType = "depth";
  const socketName = `${symbol.toLowerCase()}@${socketType}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}@500ms`;
  return connectSocketMethod(socketType, url, openCallback).pipe(
    map(depthTransform)
  );
};

export const marketTicketsSocket = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<Ticker[]> => {
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
  const socketName = `${symbol}@kline_${interval}`;
  const url = `${BINANCE_FUTURES_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketName, url).pipe(
    map<IBinanceKline, IKline>(transformKlineWs)
  );
};
