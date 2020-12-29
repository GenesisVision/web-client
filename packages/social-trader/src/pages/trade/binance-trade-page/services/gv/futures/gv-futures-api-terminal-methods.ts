import { GVTerminalMethods } from "pages/trade/binance-trade-page/services/gv/gv-api-terminal-methods";
import { ITerminalMethods } from "pages/trade/binance-trade-page/trading/terminal.types";

import {
  depthSocket,
  getUserStreamSocket,
  klineSocket,
  marketTicketsSocket,
  markPriceSocket,
  tradeSocket
} from "../../futures/binance-futures-ws.service";
import {
  cancelAllOrders,
  cancelOrder,
  changeLeverage,
  changeMarginMode,
  changePositionMode,
  getAccountInformation,
  getAllOrders,
  getAllTrades,
  getDepth,
  getExchangeInfo,
  getKlines,
  getMarkPrice,
  getOpenOrders,
  getPositionMode,
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

  getMarkPrice,
  getPositionMode,
  changePositionMode,
  changeLeverage,
  changeMarginMode,

  markPriceSocket,
  klineSocket,
  tradeSocket,
  depthSocket,
  marketTicketsSocket,
  getUserStreamSocket
};
