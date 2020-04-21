import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  getAccountInformation,
  getAllOrders,
  getBinanceTrades,
  getOpenOrders
} from "services/binance/binance-http.service";
import {
  getAccountInformationSocket,
  getAllOrdersSocket,
  getOpenOrdersSocket
} from "services/binance/binance-ws.service";
import { generateStream, REQUEST_TYPE } from "services/stream.service";
import { ConnectSocketMethodType } from "services/websocket.service";

export const getUserDataStream = (
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
): Observable<any> =>
  generateStream([
    getAccountInformation(authData)
    // getAccountInformationSocket(connectSocketMethod, authData)
  ]);

export const getOpenOrdersStream = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
): Observable<any> =>
  generateStream(
    [
      getOpenOrders(symbol, authData),
      getOpenOrdersSocket(connectSocketMethod, authData)
    ],
    REQUEST_TYPE.ARRAY
  );

export const getAllOrdersStream = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
): Observable<any> =>
  generateStream(
    [
      getAllOrders(symbol, authData).pipe(map(item => item.reverse())),
      getAllOrdersSocket(symbol, connectSocketMethod, authData)
    ],
    REQUEST_TYPE.ARRAY
  );

export const getSymbolTradeStream = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType
): Observable<any> =>
  generateStream(
    [
      getBinanceTrades(symbol).pipe(map(item => item.reverse()))
      // chainSocket({ symbol: symbol }).pipe(
      //   filter(item => item.stream === `${symbol.toLowerCase()}@trade`),
      //   map(item => item.data)
      // )
    ],
    REQUEST_TYPE.ARRAY
  ).pipe();
