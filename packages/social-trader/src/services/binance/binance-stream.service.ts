import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  getAccountInformation,
  getAllOrders,
  getOpenOrders,
  getTrades
} from "services/binance/binance-http.service";
import {
  getAccountInformationSocket,
  getAllOrdersSocket,
  getOpenOrdersSocket
} from "services/binance/binance-ws.service";
import { generateStream, REQUEST_TYPE } from "services/stream.service";
import { ConnectSocketMethodType } from "services/websocket.service";

export const getUserDataStream = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<any> =>
  generateStream([
    getAccountInformation(),
    getAccountInformationSocket(connectSocketMethod)
  ]);

export const getOpenOrdersStream = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType
): Observable<any> =>
  generateStream(
    [getOpenOrders(symbol), getOpenOrdersSocket(connectSocketMethod)],
    REQUEST_TYPE.ARRAY
  );

export const getAllOrdersStream = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType
): Observable<any> =>
  generateStream(
    [
      getAllOrders(symbol).pipe(map(item => item.reverse())),
      getAllOrdersSocket(symbol, connectSocketMethod)
    ],
    REQUEST_TYPE.ARRAY
  );

export const getSymbolTradeStream = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType
): Observable<any> =>
  generateStream(
    [
      getTrades(symbol).pipe(map(item => item.reverse()))
      // chainSocket({ symbol: symbol }).pipe(
      //   filter(item => item.stream === `${symbol.toLowerCase()}@trade`),
      //   map(item => item.data)
      // )
    ],
    REQUEST_TYPE.ARRAY
  ).pipe();
