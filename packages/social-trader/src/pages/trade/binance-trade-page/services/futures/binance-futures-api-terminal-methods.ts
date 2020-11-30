import { GVTerminalMethods } from "pages/trade/binance-trade-page/services/gv/gv-api-terminal-methods";
import { ITerminalMethods } from "pages/trade/binance-trade-page/trading/terminal.types";

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
  getServerTime,
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

export const BinanceFuturesTerminalMethods = ({
  ...GVTerminalMethods,
  markPriceSocket,
  getMarkPrice,
  getServerTime,
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
} as unknown) as ITerminalMethods;
