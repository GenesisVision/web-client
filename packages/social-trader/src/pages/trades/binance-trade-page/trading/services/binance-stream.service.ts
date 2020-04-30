import { Ticker } from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { generateStream } from "services/stream.service";
import { ConnectSocketMethodType } from "services/websocket.service";

import { getTickers } from "./binance-http.service";
import { marketTicketsSocket } from "./binance-ws.service";

export const getTickersStream = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<Ticker[]> =>
  generateStream([getTickers(), marketTicketsSocket(connectSocketMethod)]);
