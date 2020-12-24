import { GVTerminalMethods } from "pages/trade/binance-trade-page/services/gv/gv-api-terminal-methods";
import { ITerminalMethods } from "pages/trade/binance-trade-page/trading/terminal.types";

import {
  depthSocket,
  getUserStreamSocket,
  klineSocket,
  marketTicketsSocket,
  tradeSocket
} from "../../futures/binance-futures-ws.service";
import {
  cancelAllOrders,
  cancelOrder,
  getAccountInformation,
  getAllOrders,
  getAllTrades,
  getDepth,
  getExchangeInfo,
  getKlines,
  getOpenOrders,
  getServerTime,
  getTickers,
  getTrades,
  getUserStreamKey,
  tradeRequest
} from "./gv-futures-http.service";

export const GVFuturesTerminalMethods: ITerminalMethods = {
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
