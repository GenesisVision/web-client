import { ITerminalMethods } from "pages/trades/binance-trade-page/trading/trading.types";

import {
  cancelAllOrders,
  cancelOrder,
  changeLeverage,
  changeMarginMode,
  getAccountInformation,
  getAllOrders,
  getDepth,
  getExchangeInfo,
  getKlines,
  getLeverageBrackets,
  getOpenOrders,
  getPositionInformation,
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
