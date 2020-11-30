import { GVTerminalMethods } from "pages/trade/binance-trade-page/services/gv/gv-api-terminal-methods";
import { getKlines } from "pages/trade/binance-trade-page/services/spot/binance-spot-http.service";
import { ITerminalMethods } from "pages/trade/binance-trade-page/trading/terminal.types";

import {
  depthSocket,
  getUserStreamSocket,
  klineSocket,
  marketTicketsSocket,
  tradeSocket
} from "../spot/binance-spot-ws.service";
import {
  cancelAllOrders,
  cancelOrder,
  getAccountInformation,
  getAllOrders,
  getAllTrades,
  getDepth,
  getExchangeInfo,
  getOpenOrders,
  getServerTime,
  getTickers,
  getTrades,
  getUserStreamKey,
  tradeRequest
} from "./gv-spot-http.service";

export const GVSpotTerminalMethods: ITerminalMethods = {
  ...GVTerminalMethods,
  getExchangeInfo,
  getOpenOrders,
  getAllTrades,
  getAllOrders,
  getUserStreamKey,
  getAccountInformation,
  getTrades,
  getKlines,
  getServerTime,
  getTickers,
  getDepth,
  cancelAllOrders,
  cancelOrder,
  tradeRequest,
  klineSocket,
  tradeSocket,
  depthSocket,
  marketTicketsSocket,
  getUserStreamSocket
};
