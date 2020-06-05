import { BinanceFuturesTerminalMethods } from "pages/trades/binance-trade-page/services/futures/binance-futures-api-terminal-methods";
import { BinanceSpotTerminalMethods } from "pages/trades/binance-trade-page/services/spot/binance-spot-api-terminal-methods";
import {
  ITerminalMethods,
  TerminalType
} from "pages/trades/binance-trade-page/trading/terminal.types";

export const TYPE_PARAM_NAME = "type";

export const getBinanceTerminalApiMethods = (
  type?: TerminalType
): ITerminalMethods => {
  switch (type) {
    case "futures":
      return BinanceFuturesTerminalMethods;
    case "spot":
    default:
      return BinanceSpotTerminalMethods;
  }
};
