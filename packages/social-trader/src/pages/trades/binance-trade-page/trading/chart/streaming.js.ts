import {
  BINANCE_WS_API_TYPE,
  BINANCE_WS_API_URL
} from "pages/trades/binance-trade-page/services/binance-ws.service";
import { SubscribeBarsCallback } from "pages/trades/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { Socket } from "services/websocket.service";

const channelToSubscription = new Map<string, Socket>();

export function subscribeOnStream(
  subscribeUID: string,
  symbol: string,
  interval: string,
  callback: SubscribeBarsCallback
) {
  const stream = channelToSubscription.get(subscribeUID);

  if (stream !== undefined) {
    return;
  }

  const socketName = `${symbol}@kline_${interval}`;
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  const socket = new Socket(url);

  socket.subscribe().subscribe(data => {
    callback({
      time: data.k.t,
      open: data.k.o,
      high: data.k.h,
      low: data.k.l,
      close: data.k.c
    });
  });

  channelToSubscription.set(subscribeUID, socket);
}

export function unsubscribeFromStream(uid: string) {
  const socket = channelToSubscription.get(uid);
  if (socket !== undefined) {
    socket.disconnect();
    channelToSubscription.delete(uid);
  }
}
