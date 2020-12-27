import { GVFuturesTerminalMethods } from "pages/trade/binance-trade-page/services/gv/futures/gv-futures-api-terminal-methods";
import { GVSpotTerminalMethods } from "pages/trade/binance-trade-page/services/gv/spot/gv-spot-api-terminal-methods";
import {
  ITerminalMethods,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";

export const TYPE_PARAM_NAME = "type";

export const getBinanceTerminalApiMethods = (
  type?: TerminalType
): ITerminalMethods => {
  switch (type) {
    case "futures":
      return GVFuturesTerminalMethods;
    case "spot":
    default:
      return GVSpotTerminalMethods;
  }
};
