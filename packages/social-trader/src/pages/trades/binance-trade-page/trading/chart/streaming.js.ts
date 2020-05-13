import {
  BINANCE_WS_API_TYPE,
  BINANCE_WS_API_URL
} from "pages/trades/binance-trade-page/services/binance-ws.service";
import { Socket } from "services/websocket.service";
// import { map } from "rxjs/operators";

const channelToSubscription = new Map();

export function subscribeOnStream(symbol: string, interval: string) {
  // todo
}

export function unsubscribeFromStream(uid: string) {
  // todo
}
