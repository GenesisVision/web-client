import { ITerminalMethods } from "pages/trades/binance-trade-page/trading/trading.types";

import {
  cancelAllOrders,
  cancelOrder,
  changeLeverage,
  changeMarginMode,
  changePositionMode,
  getAccountInformation,
  getAllOrders,
  getDepth,
  getExchangeInfo,
  getKlines,
  getLeverageBrackets,
  getOpenOrders,
  getPositionInformation,
  getPositionMode,
  getTickers,
  getTrades,
  getUserStreamKey,
  tradeRequest
} from "./binance-futures-http.service";
import {
  depthSocket,
  getUserStreamSocket,
  klineSocket,
  marketTicketsSocket,
  tradeSocket
} from "./binance-futures-ws.service";

export const BinanceFuturesTerminalMethods: ITerminalMethods = {
  changePositionMode,
  getPositionMode,
  getPositionInformation,
  getLeverageBrackets,
  changeLeverage,
  changeMarginMode,
  getExchangeInfo,
  getOpenOrders,
  getAllOrders,
  getUserStreamKey,
  getKlines,
  klineSocket,
  getAccountInformation,
  getTrades,
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
