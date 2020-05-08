import {
  cancelAllOrders,
  cancelOrder,
  getAccountInformation,
  getAllOrders,
  getDepth,
  getExchangeInfo,
  getOpenOrders,
  getTickers,
  getTrades,
  getUserStreamKey,
  tradeRequest
} from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import {
  depthSocket,
  getUserStreamSocket,
  marketTicketsSocket,
  tradeSocket
} from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import { ITerminalMethods } from "pages/trades/binance-trade-page/trading/trading.types";

export const BinanceTerminalMethods: ITerminalMethods = {
  getExchangeInfo,
  getOpenOrders,
  getAllOrders,
  getUserStreamKey,
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
