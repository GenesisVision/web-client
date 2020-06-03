import { ITerminalMethods } from "pages/trades/binance-trade-page/trading/trading.types";

import {
  cancelAllOrders,
  cancelOrder,
  changeLeverage,
  changeMarginMode,
  changePositionMode,
  getAccountInformation,
  getAllOrders,
  getBalancesForTransfer,
  getDepth,
  getExchangeInfo,
  getKlines,
  getLeverageBrackets,
  getMarkPrice,
  getOpenOrders,
  getPositionInformation,
  getPositionMode,
  getTickers,
  getTrades,
  getUserStreamKey,
  newFutureAccountTransfer,
  tradeRequest
} from "./binance-futures-http.service";
import {
  depthSocket,
  getUserStreamSocket,
  klineSocket,
  marketTicketsSocket,
  markPriceSocket,
  tradeSocket
} from "./binance-futures-ws.service";

export const BinanceFuturesTerminalMethods: ITerminalMethods = {
  markPriceSocket,
  getMarkPrice,
  getBalancesForTransfer,
  newFutureAccountTransfer,
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
