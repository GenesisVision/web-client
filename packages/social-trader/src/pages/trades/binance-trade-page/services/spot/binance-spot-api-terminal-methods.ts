import { ITerminalMethods } from "pages/trades/binance-trade-page/trading/trading.types";

import {
  cancelAllOrders,
  cancelOrder,
  getAccountInformation,
  getAllOrders,
  getDepth,
  getExchangeInfo,
  getKlines,
  getOpenOrders,
  getTickers,
  getTrades,
  getUserStreamKey,
  tradeRequest
} from "./binance-spot-http.service";
import {
  depthSocket,
  getUserStreamSocket,
  klineSocket,
  marketTicketsSocket,
  tradeSocket
} from "./binance-spot-ws.service";

export const BinanceSpotTerminalMethods: ITerminalMethods = {
  getExchangeInfo,
  getOpenOrders,
  getAllOrders,
  getUserStreamKey,
  getAccountInformation,
  getTrades,
  getKlines,
  klineSocket,
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
