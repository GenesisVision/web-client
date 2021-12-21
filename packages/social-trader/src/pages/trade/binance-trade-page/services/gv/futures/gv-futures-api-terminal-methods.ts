import { GVTerminalMethods } from "pages/trade/binance-trade-page/services/gv/gv-api-terminal-methods";
import { ITerminalMethods } from "pages/trade/binance-trade-page/trading/terminal.types";

import {
  depthSocket,
  getUserStreamSocket,
  klineSocket,
  marketTicketsSocket,
  markPricesSocket,
  tradeSocket
} from "../../futures/binance-futures-ws.service";
import {
  adjustMargin,
  cancelAllOrders,
  cancelOrder,
  changeLeverage,
  changeMarginMode,
  changePositionMode,
  getAllOrders,
  getAllTrades,
  getDepth,
  getExchangeInfo,
  getFuturesBalances,
  getKlines,
  getLeverageBrackets,
  getMarkPrices,
  getOpenOrders,
  getPositionInformation,
  getPositionMode,
  getServerTime,
  getTickers,
  getTrades,
  getTransactionHistory,
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
  getTrades,
  getKlines,
  getServerTime,
  getTickers,
  getDepth,
  cancelAllOrders,
  cancelOrder,
  tradeRequest,

  getPositionInformation,
  getTransactionHistory,
  getLeverageBrackets,
  getMarkPrices,
  getPositionMode,
  changePositionMode,
  changeLeverage,
  changeMarginMode,
  adjustMargin,
  getFuturesBalances,

  markPricesSocket,
  klineSocket,
  tradeSocket,
  depthSocket,
  marketTicketsSocket,
  getUserStreamSocket
};
